Ext.define('Thesis.view.used.UsedGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'usedgrid',

    controller: 'used',

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
            text: 'Добавить',
            margin: '0 5 0 0',
            handler: 'onCreateWindow'
        }, {
            xtype: 'button',
            text: 'Удалить',
            handler: 'onDeleteUser'
        }]
    }],

    columns: [
        {text: 'Время последнего использования', dataIndex: 'used', align: 'left', flex: 1, editor: 'textfield'}
    ],

    plugins: {
        ptype: 'cellediting',
        clicksToEdit: 2
    }
});
