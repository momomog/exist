Ext.define('Thesis.view.used.UsedWindow', {
    extend: 'Ext.window.Window',

    controller: 'used',
    viewModel: 'used',

    height: 137,
    width: 335,
    title: 'Добавить интервал',
    defaultType: 'textfield',

    items: [{
        allowBlank: false,
        fieldLabel: 'Наименование',
        emptyText: 'интервал',
        labelWidth:'auto',
        margin: 10,
        bind: '{name}'
    }],

    buttons: [
        {
            text: 'OK',
            handler: 'onAddUsed'
        }]
});