Ext.define('Thesis.model.Users', {
    extend: 'Ext.data.Model',

    fields: [
        'id', 'name', 'email'
    ],

    autoLoad: true,
    proxy: {
        type: 'ajax',
        reader: {
            type: 'json',
            successProperty: 'users'
        },
        writer: {
            type: 'json',
            writeAllFields: true
        }

    }
});