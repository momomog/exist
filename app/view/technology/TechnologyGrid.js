Ext.define('Thesis.view.technology.TechnologyGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'technologygrid',

    controller: 'technology',

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
        {text: 'Наименование технологии', dataIndex: 'technology', align: 'left', flex: 1, editor: 'textfield'}
    ],

    plugins: {
        ptype: 'cellediting',
        clicksToEdit: 2
    }
});
