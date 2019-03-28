Ext.define('Thesis.model.Personal', {
    extend: 'Ext.data.Model',

    fields: [
       'id', 'technology', 'skill', 'used', 'commentary'
    ],

    autoLoad: true,
    proxy: {
        type: 'ajax',
        reader: {
            type: 'json',
            successProperty: 'personals'
        },
        writer: {
            type: 'json',
            writeAllFields: true
        }
    }
});