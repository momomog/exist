Ext.define('Thesis.view.users.UsersController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.users',
    viewModel: 'main',

    onAdd: function () {
        var myWin = new Ext.Window({
            height  : 200,
            width   : 320,
            title   : 'Новый пользователь',
            defaultType: 'textfield',

            viewModel:'main',

            items: [{
                allowBlank: false,
                fieldLabel: 'User ID',
                emptyText: 'user id',
                margin: 10,
                reference: 'id',
                bind: '{id}'
            }, {
                allowBlank: false,
                fieldLabel: 'Name',
                emptyText: 'password',
                inputType: 'name',
                margin: 10,
                reference: 'name',
                bind: '{name}'
            }, {
                allowBlank: false,
                fieldLabel: 'Email',
                emptyText: 'password',
                inputType: 'email',
                margin: 10,
                reference: 'email',
                bind: '{email}'
            }],

            buttons : [
                {
                    text    : 'OK',
                    handler : function(){
                        var vm = this.lookupReference('id');
                        var store = Ext.getStore('usersStore');
                        debugger;
                        store.add({
                            id: vm.get('id'),
                            name: vm.get('name'),
                            email: vm.get('email')
                        });
                    }
                }
            ]
        });

        myWin.show();



    },

    onDelete: function () {

    }

});