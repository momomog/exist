Ext.define('Thesis.view.users.UsersGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'usersgrid',

    controller: 'users',
    viewModel: 'main',

    requires: [
        'Thesis.store.UsersStore',
        'Thesis.view.users.UsersController'
    ],

    title: 'Пользователи',

    store: {
        type: 'users'
    },

    dockedItems: [{
        xtype: 'toolbar',
        items: [{
            xtype: 'button',
            text: 'Добавить пользователя',
            margin: '0 10 0 0',
            handler: 'onAdd'
        }, {
            xtype: 'button',
            text: 'Удалить пользователя',
            handler: 'onDelete'
        }]
    }],

    columns: [
        {text: 'Id', dataIndex: 'id', align: 'left'},
        {text: 'Имя', dataIndex: 'name', align: 'left', flex: 1},
        {text: 'Электронный адрес', dataIndex: 'email', align: 'left', flex: 1}
    ]
});
