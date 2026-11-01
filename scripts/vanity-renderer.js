/* Sidebar-only rendering. Native combat, closeups and shop previews stay intact. */
(() => {
    'use strict';
    setup.installPCVanityRenderer = api => {
        const script = document.getElementById('twine-user-script')?.textContent || '';
        function source(file) {
            const marker = script.indexOf(file + '" */');
            if (marker < 0) throw new Error('当前游戏缺少时装绘图接口：' + file);
            const start = script.indexOf('*/', marker) + 2;
            const end = script.indexOf('/* twine-user-script #', start);
            return script.slice(start, end < 0 ? undefined : end);
        }
        let worn, player, exposure;
        function prepare() {
            worn = { ...State.variables.worn, ...api.visualWorn(api.shopPreview?.()) };
            player = { ...State.variables.player };
            const resize = ['upper', 'under_upper', 'over_upper'].reduce((sum, slot) => sum + (Number(worn[slot]?.bustresize) || 0), 0);
            player.perceived_breastsize = Math.max(0, Math.min(setup.breastsizes.length - 1, player.breastsize + resize));
            const itemExposure = slot => worn[slot]?.type.includes('naked') ? 2 : worn[slot]?.exposed || 0;
            const upperBare = ['over_upper', 'upper'].every(slot => itemExposure(slot) >= 2);
            const lowerBare = ['over_lower', 'lower'].every(slot => itemExposure(slot) >= 2);
            exposure = {
                upper: upperBare ? (itemExposure('under_upper') >= 1 ? 2 : 1) : 0,
                lower: lowerBare ? (itemExposure('under_lower') >= 1 ? 2 : 1) : 0
            };
            const libertine = State.variables.libertine || 0;
            if (libertine >= exposure.upper) exposure.upper = 0;
            if (libertine >= exposure.lower) exposure.lower = 0;
        }
        // The native renderer is compiled into a separate model with an explicit
        // read facade. Never swap State.variables.worn, even during a synchronous
        // render: native helpers, events and animated frames must keep real gear.
        const facade = new Proxy({}, {
            get(_target, key) {
                if (key === 'worn') return worn;
                if (key === 'player') return player;
                if (key === 'exposed' || key === 'exposedRaw') return Math.max(exposure.upper, exposure.lower);
                if (typeof key === 'string' && /wet(?:stage)?$/.test(key)) return 0;
                if (['upperTucked', 'lowerTucked', 'bellyTucked', 'facelayer'].includes(key)) return api.state()[key];
                if (key === 'modeloptionsOverride') return {};
                return State.variables[key];
            },
            set() { return true; }
        });
        const temporary = new Proxy({}, {
            get(_target, key) {
                if (key === 'exposedUpper') return exposure.upper;
                if (key === 'exposedLower') return exposure.lower;
                return T[key];
            },
            set(_target, key, value) { T[key] = value; return true; }
        });
        const localRenderer = Object.create(Renderer);
        localRenderer.CanvasModels = {};
        const localWindow = new Proxy(window, { set() { return true; } });
        const template = new Function('V', 'T', 'Renderer', 'window', 'clone', source('canvasmodel-main.js') + '\nreturn Renderer.CanvasModels.main;')(
            facade, temporary, localRenderer, localWindow, clone);
        template.name = 'pcVanitySidebar';
        // Modern DoL has a base-clothing JS mapper. It has no closure state;
        // compile it against the same read facade as the copied native template.
        const getOptions = new Function('V', 'return (' + getClothingOptions.toString() + ');')(facade);
        const definitions = {};
        new Function('V', 'T', 'DefineMacro', 'getClothingOptions', 'apparentbreastsizecheck', source('canvasmodel-img.js'))(
            facade, temporary, (name, handler) => { definitions[name] = handler; }, getOptions, () => {});
        if (!definitions['modelprepare-player-body'] || !definitions['modelprepare-player-clothes'])
            throw new Error('当前游戏的人物绘图准备接口不受支持。');
        Renderer.CanvasModels.pcVanitySidebar = template;
        Macro.add('pcVanityPrepareBody', { handler() {
            prepare();
            T.coverBreastsWithArm = false;
            definitions['modelprepare-player-body'].call(this);
        } });
        Macro.add('pcVanityPrepareClothes', { handler() { definitions['modelprepare-player-clothes'].call(this); } });
        api.renderWorn = () => worn;
        api.visualHasStrapon = () => worn?.under_lower?.type.includes('strap-on');
    };
})();
