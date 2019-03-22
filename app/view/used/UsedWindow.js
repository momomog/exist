Ext.define('Thesis.view.used.UsedWindow', {
    extend: 'Ext.window.Window',

    controller: 'used',
    viewModel: 'used',

    height: 110,
    width: 310,
    title: 'Добавить интервал',
    defaultType: 'textfield',

    items: [{
        allowBlank: false,
        fieldLabel: 'Наименование',
        emptyText: 'интервал',
        margin: 10,
        bind: '{used}'
    }],

    buttons: [
        {
            text: 'OK',
            handler: 'onAdd'
        }]
});