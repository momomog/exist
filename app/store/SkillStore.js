Ext.define('Thesis.store.SkillStore', {
    extend: 'Ext.data.Store',

    alias: 'store.skill',
    storeId: 'skillStore',
    model: 'Thesis.model.Skill',

    proxy: {
        type: 'ajax',
        autoLoad: true,
        url: 'http://localhost:9999/spring/skills',
        reader: {
            type: 'json',
            rootProperty: 'skills'
        }
    }
});
