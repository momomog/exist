Ext.define('Thesis.view.main.Main', {
    extend: 'Ext.tab.Panel',

    mixins: {
        skill: 'Thesis.controller.SkillController',
        tech: 'Thesis.controller.TechnologyController',
        lastUsed: 'Thesis.controller.UsedController',
        peronal: 'Thesis.controller.PersonalController'
    },

    requires: [
        'Thesis.controller.MainController',
        'Thesis.view.technology.TechnologyGrid',
        'Thesis.view.users.UsersGrid'
    ],

    controller: 'main',
    viewmodel: 'main',

    tabBarHeaderPosition: 0,
    titleRotation: 0,
    tabRotation: 0,
    bodyPadding: '0 0 0 10',

    responsiveConfig: {
        wide: {
            headerPosition: 'left'
        }
    },

    items: [{
        title: 'Пользователь',
        iconCls: 'x-fa fa-user',
        items: [{
            xtype: 'usersgrid'
        }]
    }, {
        title: 'Технология',
        iconCls: 'x-fa fa-leanpub',
        items: [{
            xtype: 'technologygrid'
        }]
    }, {
        title: 'Уровень владения',
        iconCls: 'x-fa fa-level-up',
        items: [{
            xtype: 'skillgrid'
        }]
    }, {
        title: 'Последнее использование',
        iconCls: 'x-fa fa-terminal',
        items: [{
            xtype: 'usedgrid'
        }]
    }, {
        title: 'Знания сотрудников',
        iconCls: 'x-fa fa-users',
        items: [{
            xtype: 'personalgrid'
        }]

    }],

    listeners: {
        afterrender: function(){
            this.onSkillsUpdate();
            this.onTechnologiesUpdate();
            this.onUsedsUpdate();
            this.onPersonalsUpdate();
        }
    }
});
