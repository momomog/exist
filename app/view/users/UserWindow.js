Ext.define('Thesis.view.users.UserWindow', {
    extend: 'Ext.window.Window',


    controller: 'users',
    viewModel: 'users',
    height: 140,
    width: 300,
    title: 'Добавить нового пользователя',
    defaultType: 'textfield',
    itemId: 'win',

    items: [{
        allowBlank: false,
        fieldLabel: 'Имя',
        emptyText: 'name',
        margin: 10,
        bind: '{name}'
    }, {
        allowBlank: false,
        fieldLabel: 'Эл. адрес',
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