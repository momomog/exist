Ext.define('Thesis.store.UsersStore', {
    extend: 'Ext.data.Store',

    alias: 'store.users',
    storeId: 'usersStore',
    model: 'Thesis.model.Users',

    proxy: {
        type: 'ajax',
        autoLoad: true,
        url: 'http://localhost:9999/spring/users',
        reader: {
            type: 'json',
            rootProperty: 'users'
        }
    }
});
