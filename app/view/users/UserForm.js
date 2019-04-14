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
            items: [{
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
            items: [{
                xtype: 'combobox',
                fieldLabel: 'Телефон',
                displayField: 'code',
                valueField: 'code',
                queryMode: 'local',
                editable: false,
                width: 200,
                margin: '0 5 0 0',
                bind: {
                    value: '{phoneCode}',
                    store: '{codeStore}'
                }
            }, {
                xtype: 'textfield',
                name: 'phone',
                vtype: 'phone',
                plugins: new Ext.ux.plugin.FormatPhoneNumber(),
                bind: {
                    value: '{phone}'
                }
            }, {
                xtype: 'button',
                text: 'Добавить',
                iconCls: 'x-fa fa-plus-square-o',
                margin: '0 0 0 10',
                handler: 'addPhoneToStore'
            }]
        }, {
            xtype: 'panel',
            layout: 'hbox',
            margin: '10 0 0 0',
            items: [{
                xtype: 'combobox',
                allowBlank: true,
                fieldLabel: 'Список номеров',
                displayField: 'number',
                valueField: 'number',
                queryMode: 'local',
                margin: '0 0 5 0',
                // labelWidth:'auto',
                width: 405,
                bind: {
                    value: '{phonesStoreValue}',
                    store: '{phonesStore}'
                }
            }, {
                xtype: 'button',
                text: 'Удалить',
                margin: '5 0 0 10',
                width: 112,
                iconCls: 'x-fa fa-trash-o',
                handler: 'deletePhoneFromStore'
            }
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