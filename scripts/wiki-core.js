/* Capture native JSON before SugarCube starts. No game/save data is accessed. */
(() => {
    'use strict';
    if (window.PCBakeryWiki) return;
    const parseJSON = JSON.parse.bind(JSON);
    const SITES = Object.freeze({
        zh: 'https://degreesoflewditycn.miraheze.org',
        en: 'https://degreesoflewdity.miraheze.org'
    });
    class WikiError extends Error {
        constructor(code, message) { super(message); this.name = 'WikiError'; this.code = code; }
    }
    function htmlToText(html) {
        // Never insert remote markup into the live DOM or SugarCube/Wikifier.
        const doc = new DOMParser().parseFromString(String(html).replace(/<(img|iframe|video|audio|source|link|embed)\b[^>]*>/gi, ''), 'text/html');
        doc.querySelectorAll('script,style,iframe,object,embed,img,video,audio,link,meta,form,button,.mw-editsection,.navbox,.toc,.printfooter').forEach(el => el.remove());
        doc.querySelectorAll('br').forEach(el => el.replaceWith(doc.createTextNode('\n')));
        doc.querySelectorAll('th,td').forEach(el => el.append(doc.createTextNode(' | ')));
        doc.querySelectorAll('li').forEach(el => el.prepend(doc.createTextNode('\n- ')));
        doc.querySelectorAll('p,div,section,tr,ul,ol,dl,dt,dd,h1,h2,h3,h4,h5,h6,blockquote').forEach(el => {
            el.prepend(doc.createTextNode('\n')); el.append(doc.createTextNode('\n'));
        });
        return (doc.body.textContent || '').replace(/\u00a0/g, ' ').replace(/[\t ]+/g, ' ')
            .replace(/ *\n */g, '\n').replace(/\n{3,}/g, '\n\n').trim();
    }
    function createClient(options = {}) {
        const fetcher = options.fetch || window.fetch.bind(window);
        const toText = options.htmlToText || htmlToText;
        const now = options.now || Date.now;
        const timeoutMs = options.timeoutMs || 15000;
        const cache = new Map();
        const fail = (code, text) => { throw new WikiError(code, text); };
        function language(value) {
            if (!Object.hasOwn(SITES, value)) fail('BAD_SITE', '只支持中文和英文 Wiki。');
            return value;
        }
        async function request(site, params, signal) {
            language(site);
            if (signal?.aborted) fail('CANCELLED', '查询已停止。');
            const url = new URL(SITES[site] + '/w/api.php');
            url.search = new URLSearchParams({ format: 'json', formatversion: '2', origin: '*', ...params });
            const cached = cache.get(url.href);
            if (cached && now() - cached.fetchedAt < (params.action === 'query' ? 60000 : 600000)) return cached;
            const controller = new AbortController();
            const abort = () => controller.abort();
            signal?.addEventListener('abort', abort, { once: true });
            const timer = setTimeout(abort, timeoutMs);
            try {
                const response = await fetcher(url.href, { mode: 'cors', credentials: 'omit', signal: controller.signal });
                if (!response.ok) fail('HTTP_' + response.status, response.status === 429
                    ? 'Wiki 请求过于频繁，请稍后重试。' : 'Wiki 请求失败（HTTP ' + response.status + '）。');
                if (!/application\/json/i.test(response.headers.get('content-type') || ''))
                    fail('NOT_JSON', 'Wiki 返回了网页或访问验证页，暂时无法读取。');
                if (Number(response.headers.get('content-length')) > 2000000) fail('TOO_LARGE', 'Wiki 页面过大，请缩小查询范围。');
                const body = await response.text();
                if (body.length > 1500000) fail('TOO_LARGE', 'Wiki 页面过大，请缩小查询范围。');
                let data;
                try { data = parseJSON(body); } catch (_) { fail('NOT_JSON', 'Wiki 返回的数据无法解析。'); }
                if (data.error) fail('API_ERROR', 'Wiki 无法完成查询（' + String(data.error.code || 'unknown').slice(0, 80) + '）。');
                const result = { data, fetchedAt: now() };
                cache.delete(url.href); cache.set(url.href, result);
                while (cache.size > 16) cache.delete(cache.keys().next().value);
                return result;
            } catch (error) {
                if (error instanceof WikiError) throw error;
                if (controller.signal.aborted) fail(signal?.aborted ? 'CANCELLED' : 'TIMEOUT', signal?.aborted ? '查询已停止。' : 'Wiki 响应超时，请稍后重试。');
                fail('NETWORK', '无法连接 Wiki，请检查网络；也可能是当前浏览器或站点限制了跨域请求。');
            } finally {
                clearTimeout(timer); signal?.removeEventListener('abort', abort);
            }
        }
        function createSession({ signal, preferredSite = 'zh' } = {}) {
            language(preferredSite);
            const candidates = new Map(), pages = new Map(), contents = new Map(), sources = [];
            let calls = 0, searches = 0, reads = 0, finds = 0;
            function budget(kind) {
                if (signal?.aborted) fail('CANCELLED', '查询已停止。');
                if (calls >= 8 || (kind === 'search' ? searches >= 3 : reads >= 5))
                    fail('BUDGET', '已达到本次查询上限，请依据已读取资料回答，或请玩家缩小问题范围。');
                calls++;
                if (kind === 'search') searches++; else reads++;
                if (kind === 'find') finds++;
            }
            async function search({ query, site = preferredSite, limit = 5 }) {
                budget('search'); language(site);
                if (typeof query !== 'string' || !query.trim() || query.length > 160) fail('BAD_QUERY', '搜索词需要为 1–160 个字符。');
                const count = Math.max(1, Math.min(5, Math.floor(Number(limit) || 5)));
                const { data, fetchedAt } = await request(site, {
                    action: 'query', list: 'search', srsearch: query.trim(), srnamespace: '0', srlimit: String(count)
                }, signal);
                const results = (data.query?.search || []).filter(row => Number.isSafeInteger(row.pageid) && row.pageid > 0).map(row => {
                    const sourceId = site + ':' + row.pageid;
                    candidates.set(sourceId, { site, pageid: row.pageid, title: String(row.title) });
                    return { sourceId, title: String(row.title), snippet: toText(row.snippet || '').slice(0, 500) };
                });
                return { ok: true, site, query: query.trim(), totalHits: data.query?.searchinfo?.totalhits || 0,
                    fetchedAt: new Date(fetchedAt).toISOString(), results,
                    note: '搜索结果是标题和摘要，不是完整正文。sourceId 可用于 pcwiki_read 读取正文片段，或 pcwiki_find 检索完整正文。' };
            }
            async function content(sourceId, section) {
                const candidate = candidates.get(sourceId);
                if (!candidate) fail('UNKNOWN_SOURCE', '该来源不在本次搜索结果中，请先调用 pcwiki_search。');
                if (section !== undefined && typeof section !== 'string') fail('BAD_SECTION', '章节编号需要为字符串。');
                const key = JSON.stringify([sourceId, section || '']);
                if (contents.has(key)) return contents.get(key);
                const { site, pageid } = candidate;
                let page = pages.get(sourceId);
                if (!page) {
                    const response = await request(site, { action: 'parse', pageid: String(pageid), redirects: '1', prop: 'text|tocdata|revid' }, signal);
                    const parsed = response.data.parse;
                    if (!parsed || typeof parsed.text !== 'string' || !Number.isSafeInteger(parsed.revid)) fail('BAD_PAGE', 'Wiki 没有返回可读取的正文。');
                    page = { ...parsed, fetchedAt: response.fetchedAt, sections: parsed.tocdata?.sections || [] };
                    pages.set(sourceId, page);
                }
                let html = page.text, heading = '', anchor = '', fetchedAt = page.fetchedAt;
                if (section !== undefined && section !== null && section !== '') {
                    const descriptor = page.sections.find(item => String(item.index) === String(section));
                    if (!descriptor) fail('BAD_SECTION', '章节编号不存在，请使用 pcwiki_read 返回的章节目录。');
                    const response = await request(site, { action: 'parse', oldid: String(page.revid), section: String(descriptor.index), prop: 'text|revid' }, signal);
                    if (typeof response.data.parse?.text !== 'string' || response.data.parse.revid !== page.revid) fail('BAD_PAGE', 'Wiki 章节与选定修订不一致。');
                    html = response.data.parse.text; heading = toText(descriptor.line || ''); anchor = descriptor.anchor || ''; fetchedAt = response.fetchedAt;
                }
                const fullText = toText(html);
                if (!fullText) fail('EMPTY_PAGE', '该 Wiki 页面没有可读取的正文，请改查其他条目。');
                const result = { fullText, sourceId, site, page, heading, anchor, fetchedAt, section: section || '' };
                contents.set(key, result);
                return result;
            }
            function metadata({ sourceId, site, page, heading, anchor, fetchedAt, section, fullText }) {
                const url = new URL(SITES[site] + '/w/index.php');
                url.search = new URLSearchParams({ title: page.title, oldid: String(page.revid) });
                if (anchor) url.hash = anchor;
                let source = sources.find(item => item.url === url.href);
                if (!source) {
                    source = { number: sources.length + 1, site, title: String(page.title), section: heading,
                        revision: page.revid, url: url.href, fetchedAt: new Date(fetchedAt).toISOString() };
                    sources.push(source);
                }
                return { ok: true, sourceId, section, citation: source, totalCharacters: fullText.length,
                    sections: page.sections.slice(0, 100).map(item => ({ index: String(item.index), title: toText(item.line || '') })),
                    sectionsTruncated: page.sections.length > 100 };
            }
            function pagination(offset, limit, max) {
                if (!Number.isSafeInteger(offset) || offset < 0 || !Number.isSafeInteger(limit) || limit < 1 || limit > max)
                    fail('BAD_PAGINATION', 'offset 需要为非负整数，limit 需要为 1–' + max + ' 的整数。');
            }
            function position(offset, length) {
                if (offset > length) fail('BAD_OFFSET', 'offset 超出该页或章节正文长度（' + length + '）。');
            }
            async function read({ sourceId, section, offset = 0, limit = 10000 }) {
                budget('read'); pagination(offset, limit, 10000);
                const body = await content(sourceId, section), { fullText } = body;
                position(offset, fullText.length);
                const endOffset = Math.min(offset + limit, fullText.length);
                return { ...metadata(body), text: fullText.slice(offset, endOffset), offset, endOffset,
                    nextOffset: endOffset < fullText.length ? endOffset : null,
                    truncated: offset > 0 || endOffset < fullText.length,
                    note: 'text 是当前页或章节正文的 [offset, endOffset) 片段，位置以 UTF-16 字符计。nextOffset 是后续片段起点，null 表示已到末尾；truncated 表示本次片段未覆盖全文。' };
            }
            async function find({ sourceId, section, query, offset = 0, limit = 5 }) {
                budget('find'); pagination(offset, limit, 5);
                if (typeof query !== 'string' || !query.trim() || query.length > 160) fail('BAD_QUERY', '页内检索词需要为 1–160 个字符。');
                const body = await content(sourceId, section), { fullText } = body;
                position(offset, fullText.length);
                // Literal, case-insensitive matching. Never interpret model input as a regex.
                const pattern = new RegExp(query.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'giu');
                const matches = [];
                let hit, totalMatches = 0, nextOffset = null;
                while ((hit = pattern.exec(fullText))) {
                    totalMatches++;
                    if (hit.index < offset) continue;
                    if (matches.length >= limit) { if (nextOffset === null) nextOffset = hit.index; continue; }
                    const startOffset = Math.max(0, hit.index - 600), endOffset = Math.min(fullText.length, hit.index + hit[0].length + 600);
                    matches.push({ offset: hit.index, startOffset, endOffset, text: fullText.slice(startOffset, endOffset) });
                }
                return { ...metadata(body), query: query.trim(), offset, matches, totalMatches, nextOffset,
                    matchesTruncated: nextOffset !== null,
                    note: '仅对所选页或章节完整正文做不区分大小写的字面检索；每项包含匹配点前后最多 600 字符。offset/nextOffset 是原正文中的位置，可用于 pcwiki_read。未匹配不代表其他名称或其他页面也不存在。' };
            }
            return { search, read, find, sources, stats: () => ({ calls, searches, reads, finds }) };
        }
        return { createSession, clearCache: () => cache.clear() };
    }
    window.PCBakeryWiki = Object.freeze({ version: '2.0.0', createClient, htmlToText, WikiError });
})();
