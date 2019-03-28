Ext.define('Thesis.model.Technology', {
    extend: 'Ext.data.Model',

    fields: [
        'id', 'name'
    ],

    autoLoad: true,
    proxy: {
        type: 'ajax',
        reader: {
            type: 'json',
            successProperty: 'technologies'
        },
        writer: {
            type: 'json',
            writeAllFields: true
        }

    }
});