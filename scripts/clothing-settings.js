/* Settings UI and live restoration of native wardrobe/shop views. */
(() => {
    'use strict';
    const vanity = setup.pcVanity, shop = setup.pcVanityShop;
    function refresh() {
        document.querySelectorAll('.pc-vanity-controls,.pc-shop-outfits').forEach(root => root.remove());
        if (document.querySelector('#wardrobe-options-div')) Wikifier.wikifyEval('<<updatewardrobe "outfits">>');
        if (document.querySelector('#clothingShop-div')) {
            if (document.querySelector('#clothes-list')) Wikifier.wikifyEval('<<updateclotheslist>>');
            else Wikifier.wikifyEval('<<updateclothingshop>>');
            if (document.querySelector('#tryonstats-div')) Wikifier.wikifyEval('<<updatetryonstats>>');
        }
        if (State.variables.worn) Wikifier.wikifyEval('<<exposure>><<updatesidebarimg>><<updatesidebardescription>><<updateallure>>');
        if (typeof updateMoment === 'function') updateMoment();
    }
    const api = setup.pcClothing = setup.createPCClothingSettings({
        vars:()=>State.variables, vanity,
        cancelShopping:()=>shop.close(), resetEditing:()=>vanity.resetEditing(),
        resetNativeTrial:()=>Wikifier.wikifyEval('<<tryOnReset>>'), refresh
    });
    api.renderSettings = parent => {
        const section = document.createElement('section'); section.className = 'solidBorderContainer settings-container pcb-clothing-settings';
        const heading = document.createElement('div'); heading.className = 'settingsHeader'; heading.textContent = '衣着系统优化';
        const row = document.createElement('div'); row.className = 'settingsToggleItemWide pcb-setting-row';
        const label = document.createElement('label');
        const input = document.createElement('input'); input.type = 'checkbox'; input.className = 'pcb-clothing-toggle'; input.checked = api.enabled();
        const title = document.createElement('span'); title.textContent = '开启衣着系统优化';
        const description = document.createElement('small');
        description.textContent = '开启后，在原版的基础上增加只影响模型显示的时装槽，并添加服装店内按预设套装购买的功能。';
        const status = document.createElement('p'); status.className = 'pcb-settings-description'; status.setAttribute('aria-live','polite');
        input.addEventListener('change', () => {
            status.textContent = '';
            try { api.setEnabled(input.checked); }
            catch (error) { input.checked = api.enabled(); status.textContent = error.message; }
        });
        label.append(input,title); row.append(label,description); section.append(heading,row,status); parent.append(section);
    };
    $(document).on(':storyready.pcClothing :passagestart.pcClothing', () => {
        try { api.reconcile(); }
        catch (error) { console.error('[PCClothing]',error); }
    });
})();
