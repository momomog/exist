Ext.define('Thesis.view.technology.TechnologyGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'technologygrid',

    controller: 'technology',
    itemId: 'technologyGrid',

    requires: [
        'Ext.grid.plugin.CellEditing',
        'Thesis.controller.TechnologyController'
    ],

    title: 'Технология',

    store: {
        type: 'technology'
    },

    dockedItems: [{
        xtype: 'toolbar',
        items: [{
            xtype: 'button',
            iconCls: 'x-fa fa-user-plus',
            text: 'Добавить',
            margin: '0 5 0 0',
            handler: 'onCreateWindow'
        }, {
            xtype: 'button',
            iconCls: 'x-fa fa-trash-o',
            text: 'Удалить',
            handler: 'onDeleteTechnology'
        }, {
            xtype: 'button',
            iconCls: 'x-fa fa-refresh',
            text: 'Обновить данные',
            handler: 'onTechnologiesUpdate'
        }]
    }],

    columns: [
        {text: 'Наименование технологии', dataIndex: 'name', align: 'left', flex: 1, editor: 'textfield'}
    ],

    plugins: {
        ptype: 'rowediting',
        clicksToEdit: 2
    },

    listeners: {
        afterrender: 'onTechnologiesUpdate',
        edit: 'onTechnologyEdit'
    }
});
