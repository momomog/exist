Ext.define('Thesis.view.skill.SkillGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'skillgrid',

    controller: 'skill',
    itemId: 'skillGrid',
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
            iconCls: 'x-fa fa-user-plus',
            text: 'Добавить',
            margin: '0 5 0 0',
            handler: 'onCreateWindow'
        }, {
            xtype: 'button',
            iconCls: 'x-fa fa-trash-o',
            text: 'Удалить',
            handler: 'onDeleteSkill'
        }, {
            xtype: 'button',
            iconCls: 'x-fa fa-refresh',
            text: 'Обновить данные',
            handler: 'onSkillsUpdate'
        }]
    }],

    columns: [
        {text: 'Уровень навыков', dataIndex: 'name', align: 'left', flex: 1, editor: 'textfield'}
    ],

    plugins: {
        ptype: 'rowediting',
        clicksToEdit: 2
    },

    listeners: {
        afterrender: 'onSkillsUpdate',
        edit: 'onSkillEdit'
    }
});
