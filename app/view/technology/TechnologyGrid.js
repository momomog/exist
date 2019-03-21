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
            text: 'Добавить пользователя',
            margin: '0 10 0 0',
            handler: 'onCreateWindow'
        }, {
            xtype: 'button',
            text: 'Удалить пользователя',
            handler: 'onDeleteUser'
        }]
    }],

    columns: [
        {text: 'Имя', dataIndex: 'name', align: 'left', flex: 1, editor: 'textfield'},
        {text: 'Знание технологий', dataIndex: 'technology', align: 'left', flex: 2, editor: 'textfield'}
    ],

    plugins: {
        ptype: 'cellediting',
        clicksToEdit: 2
    }
});
