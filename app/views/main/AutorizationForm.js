Ext.define('Thesis.views.main.AutorizationForm',{
    extend: 'Ext.form.Panel',
    xtype: 'autorization',

    controller: 'mainC',

    viewModel:{
        data:{
            login: null,
            password: null
        }
    },

    title: 'Введите данные для входа на сайт',
    frame: true,
    closable: true,

    width: 350,
    height: 200,


    floating: true,

    items:[{
        xtype: 'fieldset',
        title: 'Данные',
        items:[{
            xtype: 'textfield',
            fieldLabel: 'Логин',
            bind: '{login}',
        },{
            xtype: 'textfield',
            fieldLabel: 'Пароль',
            bind: '{password}',
        }]
    }],

    buttons:[{
        text: 'Войти',
        // handler:
    }]


});