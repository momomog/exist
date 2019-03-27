Ext.define('Thesis.model.Personal', {
    extend: 'Ext.data.Model',

    fields: [
        'technology', 'skill', 'used', 'commentary'
    ],

    proxy: {
        type: 'rest',
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        },
        writer: {
            type: 'json',
            writeAllFields: true
        }

    }
});