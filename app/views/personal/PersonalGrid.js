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
            iconCls: 'x-fa fa-user-plus',
            text: 'Добавить сотрудника',
            margin: '0 5 0 0',
            handler: 'onCreateWindow'
        }, {
            xtype: 'button',
            iconCls: 'x-fa fa-trash-o',
            text: 'Удалить технологию',
            handler: 'onDeletePersonal'
        }, {
            xtype: 'button',
            iconCls: 'x-fa fa-refresh',
            text: 'Обновить данные',
            handler: 'onPersonalsUpdate'
        }]
    }],

    columns: [
        {
            text: 'Технология',
            dataIndex: 'technology',
            align: 'left',
            flex: 1,
            editor: {
                xtype: 'combobox',
                store: 'technologyStore',
                displayField: 'name',
                valueField: 'id',
                editable: false,
                queryMode: 'local'
            },
            filter: {
                type: 'string',
                emptyText: 'Введите текст...'
            }
        },
        {
            text: 'Уровень владения',
            dataIndex: 'skill',
            align: 'left',
            flex: 1,
            editor: {
                xtype: 'combobox',
                store: 'skillStore',
                displayField: 'name',
                valueField: 'id',
                editable: false,
                queryMode: 'local'
            },
            filter: {
                type: 'string',
                emptyText: 'Введите текст...'
            }
        },
        {
            text: 'Последнее использование',
            dataIndex: 'used',
            align: 'left',
            flex: 1,
            editor: {
                xtype: 'combobox',
                store: 'usedStore',
                displayField: 'name',
                valueField: 'id',
                editable: false,
                queryMode: 'local'
            }
        },
        {text: 'Комментарий', dataIndex: 'commentary', align: 'left', flex: 1, editor: 'textfield'}
    ],

    features: [{ftype: 'grouping'}],

    plugins: [{
        ptype: 'rowediting',
        clicksToEdit: 2
    }, {
        ptype: 'gridfilters',
        menuFilterText: 'Фильтр'
    }],

    listeners: {
        afterrender: 'onPersonalsUpdate',
        edit: 'onPersonalEdit'
    }
});
