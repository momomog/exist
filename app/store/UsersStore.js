Ext.define('Thesis.store.UsersStore', {
    extend: 'Ext.data.Store',

    alias: 'store.users',
    storeId: 'usersStore',

    fields: [
        'id', 'name', 'email'
    ],

    data: [{id: "1", name: "Иван Иванов", email: "ivanov@gmail.com"},
        {id: "2", name: "Петр Петров", email: "petrov@gmail.com"},
        {id: "3", name: "Сидор Сидоров", email: "sidorov@gmail.com"}],

    proxy: {
        type: 'memory',
        autoLoad: true,
        reader: {
            type: 'json',
            rootProperty: 'data' //items
        }
    }
});
