Ext.define('Thesis.view.skill.SkillGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'skillgrid',

    controller: 'skill',

    requires: [
        'Ext.grid.plugin.CellEditing',
        'Thesis.controller.SkillController'
    ],

    title: 'Уровень навыков',

    store: {
        type: 'skill'
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
        {text: 'Уровень навыков', dataIndex: 'skill', align: 'left', flex: 1, editor: 'textfield'}
    ],

    plugins: {
        ptype: 'cellediting',
        clicksToEdit: 2
    }
});
