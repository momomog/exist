Ext.define('Thesis.view.technology.TechnologyWindow', {
    extend: 'Ext.window.Window',

    controller: 'technology',
    viewModel: 'technology',

    height: 137,
    width: 335,
    title: 'Добавить технологию',
    defaultType: 'textfield',

    items: [{
        fieldLabel: 'Наименование',
        emptyText: 'технология',
        allowBlank: false,
        labelWidth:'auto',
        margin: 10,
        bind: '{name}'
    }],

    buttons: [
        {
            text: 'OK',
            handler: 'onAddTechnology'
        }]
});