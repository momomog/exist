Ext.define('Thesis.model.Skill', {
    extend: 'Ext.data.Model',

    fields: [
        'id', 'name'
    ],

    autoLoad: true,
    proxy: {
        type: 'ajax',
        reader: {
            type: 'json',
            successProperty: 'skills'
        },
        writer: {
            type: 'json',
            writeAllFields: true
        }

    }
});