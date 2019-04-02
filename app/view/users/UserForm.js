Ext.define('Thesis.view.users.UserForm', {
    extend: 'Ext.form.Panel',
    xtype: 'register',

    controller: 'users',
    viewModel: 'users',

    title: 'Новый пользователь',
    itemId: 'form',
    frame: true,
    width: 1260,
    height: 750,
    floating: true,

    items: [{
        xtype: 'fieldset',
        title: 'Информация',
        defaultType: 'textfield',
        fieldDefaults: {
            labelAlign: 'right',
            labelWidth: 115,
            msgTarget: 'under',
            blankText: 'Поле должно быть заполнено',
            allowBlank: false
        },
        items: [{
            xtype: 'panel',
            items: [
                {
                    xtype: 'textfield',
                    fieldLabel: 'Имя',
                    name: 'name',
                    colspan: 2,
                    bind: '{name}'

                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Эл. адрес',
                    name: 'email',
                    colspan: 2,
                    bind: '{email}'
                }]
        }, {
            xtype: 'panel',
            layout: 'hbox',
            items: [
                {
                    xtype: 'combobox',
                    store: Ext.create('Ext.data.Store', {
                        fields: ['code'],
                        data: [
                            {"code": "+7"}, {"code": "+375"}, {"code": "+380"}, {"code": "+994"}, {"code": "+373"}
                        ]
                    }),
                    fieldLabel: 'Телефон',
                    displayField: 'code',
                    valueField: 'code',
                    queryMode: 'local',
                    width: 200,
                    margin: '0 5 0 0',
                    bind: '{phoneCode}'
                }, {
                    xtype: 'textfield',
                    name: 'phone',
                    vtype: 'phone',
                    plugins: new Ext.ux.plugin.FormatPhoneNumber(),
                    bind: '{phone}'
                }, {
                    xtype: 'button',
                    text: '+',
                    margin: '0 0 0 10'
                },
            ]
        }
        ]
    }],

    buttons: [{
        text: 'Добавить',
        iconCls: 'x-fa fa-plus',
        disabled: true,
        formBind: true,
        handler: 'onAddUser'
    }, {
        text: 'Отмена',
        iconCls: 'x-fa fa-times',
        handler: 'onCancelForm'
    }]
});