Ext.define('Thesis.model.Used', {
    extend: 'Ext.data.Model',

    fields: [
        'id', 'name'
    ],

    autoLoad: true,
    proxy: {
        type: 'ajax',
        reader: {
            type: 'json',
            successProperty: 'useds'
        },
        writer: {
            type: 'json',
            writeAllFields: true
        }

    }
});