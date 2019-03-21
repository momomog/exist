Ext.define('Thesis.view.personal.PersonalGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'personalgrid',

    controller: 'personal',

    requires: [
        'Thesis.store.PersonalStore',
        'Thesis.controller.PersonalController'
    ],

    title: 'Сотрудники',

    store: {
        type: 'personal'
    },

    dockedItems: [{
        xtype: 'toolbar',
        items: [{
            xtype: 'button',
            text: 'Добавить сотрудника',
            margin: '0 10 0 0',
            handler: 'onCreateWindow'
        }, {
            xtype: 'button',
            text: 'Удалить сотрудника',
            handler: 'onDeleteUser'
        }]
    }],

    columns: [
        {text: 'Имя', dataIndex: 'name', align: 'left', flex: 1, editor: 'textfield'},
        {text: 'Технология', dataIndex: 'technology', align: 'left', flex: 1, editor: 'textfield'},
        {text: 'Уровень владения', dataIndex: 'skill', align: 'left', flex: 1, editor: 'textfield'},
        {text: 'Последнее использование', dataIndex: 'used', align: 'left', flex: 1, editor: 'textfield'},
        {text: 'Комментарий', dataIndex: 'commentary', align: 'left', flex: 1, editor: 'textfield'}
    ],

    plugins: {
        ptype: 'cellediting',
        clicksToEdit: 2
    }
});
