Ext.define('Thesis.model.Users', {
    extend: 'Ext.data.Model',

    fields: [
        'id', 'name', 'email', 'phone'
    ],

    proxy: {
        type: 'ajax',
        reader: {
            type: 'json',
            successProperty: 'users'
        }
    }
});