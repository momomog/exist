Ext.define('Thesis.store.SkillStore', {
    extend: 'Ext.data.Store',

    alias: 'store.skill',
    storeId: 'skillStore',
    model: 'Thesis.model.Skill',

    proxy: {
        type: 'ajax',
        autoLoad: true,
        url: 'http://localhost:8080/first',
        reader: {
            type: 'json',
            rootProperty: 'skills'
        },
        writer: {
            type: 'json',
            writeAllFields: true
        }
    }
});
