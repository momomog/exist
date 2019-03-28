Ext.define('Thesis.view.technology.TechnologyWindow', {
    extend: 'Ext.window.Window',

    controller: 'technology',
    viewModel: 'technology',

    height: 110,
    width: 310,
    title: 'Добавить технологию',
    defaultType: 'textfield',

    items: [{
        allowBlank: false,
        fieldLabel: 'Наименование',
        emptyText: 'технология',
        margin: 10,
        bind: '{name}'
    }],

    buttons: [
        {
            text: 'OK',
            handler: 'onAddTechnology'
        }]
});