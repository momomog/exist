Ext.define('Thesis.view.personal.PersonalWindow', {
    extend: 'Ext.window.Window',

    requires: [
        'Thesis.store.SkillStore',
        'Thesis.store.TechnologyStore',
        'Thesis.store.UsersStore'
    ],


    controller: 'personal',
    viewModel: 'personal',

    height: 250,
    width: 300,
    title: 'Новый сотрудник',
    defaultType: 'textfield',

    items: [{
        xtype: 'combobox',
        fieldLabel: 'Пользователь',
        store: 'usersStore',
        displayField: 'name',
        valueField: 'name',
        queryMode: 'local',
        reference: 'nameCombo',
        margin: 10
    }, {
        xtype: 'combobox',
        fieldLabel: 'Технология',
        store: 'technologyStore',
        displayField: 'technology',
        valueField: 'technology',
        queryMode: 'local',
        reference: 'technologyCombo',
        margin: 10
    }, {
        xtype: 'combobox',
        fieldLabel: 'Уровень владения',
        store: 'skillStore',
        displayField: 'skill',
        valueField: 'skill',
        queryMode: 'local',
        reference: 'skillCombo',
        margin: 10
    }, {
        xtype: 'combobox',
        fieldLabel: 'Последнее использование',
        store: 'usedStore',
        displayField: 'used',
        valueField: 'used',
        queryMode: 'local',
        reference: 'usedCombo',
        margin: 10
    }, {
        fieldLabel: 'Комментарий',
        emptyText: '(не обязательно)',
        margin: 10,
        bind: '{commentary}'
    }],

    buttons: [
        {
            text: 'OK',
            handler: 'onAddUser'
        }]
});