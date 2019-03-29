Ext.define('Thesis.view.personal.PersonalWindow', {
    extend: 'Ext.window.Window',

    requires: [
        'Thesis.store.SkillStore',
        'Thesis.store.TechnologyStore',
        'Thesis.store.UsersStore'
    ],


    controller: 'personal',
    viewModel: 'personal',

    height: 255,
    width: 300,
    title: 'Добавить нового сотрудника',
    defaultType: 'textfield',

    items: [{
        xtype: 'combobox',
        fieldLabel: 'Пользователь',
        store: 'usersStore',
        displayField: 'name',
        valueField: 'id',
        editable: false,
        queryMode: 'local',
        reference: 'nameCombo',
        margin: 10
    }, {
        xtype: 'combobox',
        fieldLabel: 'Технология',
        store: 'technologyStore',
        displayField: 'name',
        valueField: 'id',
        editable: false,
        queryMode: 'local',
        reference: 'technologyCombo',
        margin: 10
    }, {
        xtype: 'combobox',
        fieldLabel: 'Уровень владения',
        store: 'skillStore',
        displayField: 'name',
        valueField: 'id',
        editable: false,
        queryMode: 'local',
        reference: 'skillCombo',
        margin: 10
    }, {
        xtype: 'combobox',
        fieldLabel: 'Последнее использование',
        store: 'usedStore',
        displayField: 'name',
        valueField: 'id',
        editable: false,
        queryMode: 'local',
        reference: 'usedCombo',
        margin: 10
    }, {
        fieldLabel: 'Комментарий',
        emptyText: ' не обязательно',
        margin: 10,
        bind: '{commentary}'
    }],

    buttons: [
        {
            text: 'OK',
            handler: 'onAddPersonal'
        }]
});