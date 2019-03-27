Ext.define('Thesis.store.UsersStore', {
    extend: 'Ext.data.Store',

    alias: 'store.users',
    storeId: 'usersStore',
    model: 'Thesis.model.ForUsersModel',

    proxy: {
        type: 'ajax',
        autoLoad: true,
        url: 'http://localhost:8080/first',
        reader: {
            type: 'json',
            rootProperty: 'users'
        },
        writer: {
            type: 'json',
            writeAllFields: true
        }
    }
});
