Ext.define('Thesis.view.users.UsersGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'usersgrid',

    controller: 'users',
    viewModel: 'users',

    requires: [
        'Thesis.store.UsersStore',
        'Thesis.controller.UsersController'
    ],

    title: 'Пользователь',
    itemId: 'usersGrid',

    store: {
        type: 'users'
    },

    dockedItems: [{
        xtype: 'toolbar',
        items: [{
            xtype: 'button',
            text: 'Добавить пользователя',
            margin: '0 5 0 0',
            handler: 'onCreateWindow'
        }, {
            xtype: 'button',
            text: 'Удалить пользователя',
            handler: 'onDeleteUser'
        }, {
            xtype: 'button',
            text: 'Обновить данные',
            handler: 'onUsersUpdate'
        }]
    }],

    columns: [
        {text: 'Id', dataIndex: 'id', align: 'left', editor: 'textfield'},
        {text: 'Имя', dataIndex: 'name', align: 'left', flex: 1, editor: 'textfield'},
        {text: 'Электронный адрес', dataIndex: 'email', align: 'left', flex: 1.5, editor: 'textfield'}
    ],

    plugins: {
        ptype: 'cellediting',
        clicksToEdit: 2
    },

    listeners: {
        afterrender: 'onUsersUpdate'
    }
});
