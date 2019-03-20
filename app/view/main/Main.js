Ext.define('Thesis.view.main.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'app-main',

    requires: [
        'Thesis.view.main.MainController',
        'Thesis.view.main.MainModel',
        'Thesis.view.users.UsersGrid'
    ],

    controller: 'main',
    viewModel: 'main',


    tabBarHeaderPosition: 0,
    titleRotation: 0,
    tabRotation: 0,

    header: {
        layout: {
            align: 'stretchmax'
        }

    },

    tabBar: {
        flex: 1,
        layout: {
            align: 'stretch',
            overflowHandler: 'none'
        }
    },

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
           // xtype: 'usersgrid'
        }]
    }, {
        title: 'Уровень владения',
        items: [{
           // xtype: 'usersgrid'
        }]
    }, {
        title: 'Последнее использование',
        items: [{
           // xtype: 'usersgrid'
        }]
    }]
});
