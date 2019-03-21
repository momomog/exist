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

    responsiveConfig: {
        wide: {
            headerPosition: 'left'
        }
    },

    defaults: {
        bodyPadding: '0 0 0 20',
        tabConfig: {
            plugins: 'responsive',
            responsiveConfig: {
                wide: {
                    textAlign: 'left'
                }
            }
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
            // xtype:
        }]
    }, {
        title: 'Последнее использование',
        items: [{
            // xtype:
        }]
    }]
});
