
Ext.define('Thesis.view.users.UserEditForm', {
    extend: 'Ext.form.Panel',
    title: 'Редактирование',

    controller: 'users',

    viewModel: {
        data: {
            name: null,
            email: null,
            id: null
        },

        stores: {
            codeStore: {
                data: [
                    {"code": "+7"},
                    {"code": "+375"},
                    {"code": "+380"},
                    {"code": "+994"},
                    {"code": "+373"}
                ]
            }
        },

        formulas:{
            getCurrentPhone: function(get){
                return get('phoneCode') + get('phone');
            }
        }
    },


    floating: true,
    frame: true,
    width: 1260,
    height: 750,

    items: [{
        xtype: 'fieldset',
        title: 'Информация',
        itemId: 'fieldId',
        scope: this,
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
        }
        ]
    }],

    buttons: [{
        text: 'Сохранить',
        iconCls: 'x-fa fa-floppy-o',
        handler: 'onEditUser'
    }, {
        text: 'Отмена',
        iconCls: 'x-fa fa-times',
        handler: 'onCancelForm'
    }]
});