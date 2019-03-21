Ext.define('Thesis.store.SkillStore', {
    extend: 'Ext.data.Store',

    alias: 'store.skill',
    storeId: 'skillStore',

    fields: [
        'skill'
    ],

    data: [{skill: "Только в теории"},
        {skill: "Немного на практике"},
        {skill: "Хорошое знание"}],

    proxy: {
        type: 'memory',
        autoLoad: true,
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});
