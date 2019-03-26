Ext.define('Thesis.model.ModelForPersonalStore', {
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