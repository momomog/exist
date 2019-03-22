Ext.define('Thesis.view.skill.SkillWindow', {
    extend: 'Ext.window.Window',

    controller: 'skill',
    viewModel: 'skill',

    height: 110,
    width: 310,
    title: 'Добавить уровень владения',
    defaultType: 'textfield',

    items: [{
        allowBlank: false,
        fieldLabel: 'Наименование',
        emptyText: 'уровень',
        margin: 10,
        bind: '{skill}'
    }],

    buttons: [
        {
            text: 'OK',
            handler: 'onAdd'
        }]
});