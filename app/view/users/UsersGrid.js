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
            iconCls: 'x-fa fa-user-plus',
            text: ' Добавить пользователя',
            margin: '0 5 0 0',
            handler: 'onCreateForm'
        }, {
            xtype: 'button',
            iconCls: 'x-fa fa-refresh',
            text: 'Обновить данные',
            handler: 'onUsersUpdate'
        }, {
            xtype: 'button',
            iconCls: 'x-fa fa-tree',
            text: 'Показать знания пользователя',
            margin: '0 5 0 0',
            // bind:{
            //     store: '{treeStore}'
            // },
            handler: 'onCreateTreepanel'
        },{
            xtype: 'button',
            iconCls: 'x-fa fa-tree',
            text: 'Показать знания всех пользователей',
            margin: '0 5 0 0',
            handler: 'onCreateTreepanel'
        }]
    }],

    columns: [
        {text: 'Id', dataIndex: 'id', align: 'left'},
        {text: 'Имя', dataIndex: 'name', align: 'left', flex: 1},
        {text: 'Электронный адрес', dataIndex: 'email', align: 'left', flex: 1},
        {text: 'Телефон', dataIndex: 'phone', align: 'left', flex: 2}
    ],

    listeners: {
        //afterrender: 'onUsersUpdate',
        cellcontextmenu: 'onUserOp',
        cellmousedown: 'onUserOpClear',
        rowdblclick: 'onCreateEditPanel'
    }
});
