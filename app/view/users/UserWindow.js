Ext.define('Thesis.view.users.UserWindow', {
    extend: 'Ext.window.Window',

    controller: 'users',
    viewModel: 'users',

    height: 180,
    width: 300,
    title: 'Новый пользователь',
    defaultType: 'textfield',

    items: [{
        xtype: 'numberfield',
        allowBlank: false,
        fieldLabel: 'User ID',
        emptyText: 'id',
        margin: 10,
        bind: '{id}'
    }, {
        allowBlank: false,
        fieldLabel: 'Name',
        emptyText: 'name',
        margin: 10,
        bind: '{name}'
    }, {
        allowBlank: false,
        fieldLabel: 'Email',
        emptyText: 'email',
        margin: 10,
        bind: '{email}'
    }],

    buttons: [
        {
            text: 'OK',
            handler: 'onAddUser'
        }]
});