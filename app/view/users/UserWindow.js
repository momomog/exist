Ext.define('Thesis.view.users.UserWindow', {
    extend: 'Ext.window.Window',

    xtype: 'window',
    controller: 'users',
    viewModel: 'main',
    //autoShow: true,

    height: 200,
    width: 320,
    title: 'Новый пользователь',
    defaultType: 'textfield',

    items: [{
        allowBlank: false,
        fieldLabel: 'User ID',
        emptyText: 'user id',
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