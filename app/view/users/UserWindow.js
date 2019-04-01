Ext.define('Thesis.view.users.UserWindow', {
    extend: 'Ext.window.Window',


    controller: 'users',
    viewModel: 'users',
    height: 180,
    width: 300,
    title: 'Добавить нового пользователя',
    defaultType: 'textfield',
    itemId: 'win',

    items: [{
        allowBlank: false,
        fieldLabel: 'Имя',
        emptyText: 'name',
        labelWidth:72,
        margin: 10,
        bind: '{name}'
    }, {
        allowBlank: false,
        fieldLabel: 'Эл. адрес',
        emptyText: 'email',
        labelWidth:'auto',
        margin: 10,
        bind: '{email}'
    }],

    buttons: [
        {
            text: 'OK',
            handler: 'onAddUser'
        }]
});