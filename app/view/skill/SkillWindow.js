Ext.define('Thesis.view.skill.SkillWindow', {
    extend: 'Ext.window.Window',

    controller: 'skill',
    viewModel: 'skill',

    height: 137,
    width: 335,
    title: 'Добавить уровень владения',
    defaultType: 'textfield',

    items: [{
        allowBlank: false,
        fieldLabel: 'Наименование',
        emptyText: 'уровень',
        labelWidth:'auto',
        margin: 10,
        bind: '{name}'
    }],

    buttons: [
        {
            text: 'OK',
            handler: 'onAddSkill'
        }]
});