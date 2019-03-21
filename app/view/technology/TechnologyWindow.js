Ext.define('Thesis.view.technology.TechnologyWindow', {
    extend: 'Ext.window.Window',

    controller: 'technology',
    viewModel: 'technology',

    height: 160,
    width: 320,
    title: 'Новый пользователь',
    defaultType: 'textfield',

    items: [{
        allowBlank: false,
        fieldLabel: 'Имя',
        emptyText: 'name',
        margin: 10,
        bind: '{name}'
    }, {
        allowBlank: false,
        fieldLabel: 'Технология',
        emptyText: 'technology',
        margin: 10,
        bind: '{technology}'
    }],

    buttons: [
        {
            text: 'OK',
            handler: 'onAddUser'
        }]
});