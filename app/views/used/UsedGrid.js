Ext.define('Thesis.view.used.UsedGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'usedgrid',

    controller: 'used',
    itemId: 'usedGrid',
    requires: [
        'Ext.grid.plugin.CellEditing',
        'Thesis.controller.UsedController'
    ],

    title: 'Последнее использование',

    store: {
        type: 'used'
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
            handler: 'onDeleteUsed'
        }, {
            xtype: 'button',
            iconCls: 'x-fa fa-refresh',
            text: 'Обновить данные',
            handler: 'onUsedsUpdate'
        }]
    }],

    columns: [
        {text: 'Время последнего использования', dataIndex: 'name', align: 'left', flex: 1, editor: 'textfield'}
    ],

    plugins: {
        ptype: 'rowediting',
        clicksToEdit: 2
    },

    listeners: {
        afterrender: 'onUsedsUpdate',
        edit: 'onUsedEdit'
    }
});
