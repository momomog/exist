Ext.define('Thesis.view.personal.PersonalGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'personalgrid',

    controller: 'personal',

    requires: [
        'Ext.grid.feature.Grouping',
        'Ext.grid.plugin.CellEditing',
        'Thesis.controller.PersonalController',
        'Thesis.store.PersonalStore',
        'Thesis.store.TechnologyStore'
    ],

    title: 'Сотрудники',
    itemId: 'personalGrid',
    store: {
        type: 'personal'
    },

    dockedItems: [{
        xtype: 'toolbar',
        items: [{
            xtype: 'button',
            text: 'Добавить сотрудника',
            margin: '0 5 0 0',
            handler: 'onCreateWindow'
        }, {
            xtype: 'button',
            text: 'Удалить сотрудника',
            handler: 'onDeletePersonal'
        }, {
            xtype: 'button',
            text: 'Обновить данные',
            handler: 'onPersonalsUpdate'
        }]
    }],

    columns: [
        {text: 'Технология', dataIndex: 'technology', align: 'left', flex: 1, editor: {xtype: 'combobox', store: 'technologyStore', displayField: 'name', valueField: 'name', editable: false, queryMode: 'local'}},
        {text: 'Уровень владения', dataIndex: 'skill', align: 'left', flex: 1, editor: {xtype: 'combobox', store: 'skillStore', displayField: 'name', valueField: 'name', editable: false, queryMode: 'local'}},
        {text: 'Последнее использование', dataIndex: 'used', align: 'left', flex: 1, editor: {xtype: 'combobox', store: 'usedStore', displayField: 'name', valueField: 'name', editable: false, queryMode: 'local'}},
        {text: 'Комментарий', dataIndex: 'commentary', align: 'left', flex: 1, editor: 'textfield'}
    ],

    features: [{ftype: 'grouping'}],

    plugins: {
        ptype: 'rowediting',
        clicksToEdit: 2
    },

    editor: {
        xtype: 'combo',
        // fieldLabel: 'Divisa',
        // typeAhead: true,
        // triggerAction: 'all',
        // lazyRender:true,
        // model: 'remote',
        // triggerAction:    'all',
        // loadingText: 'Cargando lista...',
        // listClass: 'x-combo-list-small',
        // hiddenName: 'id_divisa',
        // displayField:'nombre',
        // valueField:'id_divisa',
        // width: 140,
        // anchor: '100%',
        // store: 'StoreDivisa',
        // ref: '../../../../../../divisa_c'
    },

    listeners: {
        afterrender: 'onPersonalsUpdate',
        edit: 'onPersonalEdit'
    }
});
