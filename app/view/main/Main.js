Ext.define('Thesis.view.main.Main', {
    extend: 'Ext.tab.Panel',

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
        items: [{
            xtype: 'usersgrid'
        }]
    }, {
        title: 'Технология',
        items: [{
            xtype: 'technologygrid'
        }]
    }, {
        title: 'Уровень владения',
        items: [{
            xtype: 'skillgrid'
        }]
    }, {
        title: 'Последнее использование',
        items: [{
            xtype: 'usedgrid'
        }]
    }, {
        title: 'Знания сотрудников',
        items: [{
            xtype: 'personalgrid'
        }]

    }]
});
