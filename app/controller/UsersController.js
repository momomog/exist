Ext.define('Thesis.controller.UsersController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.users',

    requires: [
        'Thesis.view.users.UserWindow'
    ],

    onCreateWindow: function () {
        var myWin = Ext.create('Thesis.view.users.UserWindow');
        myWin.show();
    },

    onAddUser: function () {
        var vm = this.getViewModel();
        var store = Ext.getStore('usersStore');
        var id = vm.get('id');
        var name = vm.get('name');
        var email = vm.get('email');
        var recs = store.getRange();

        for (var i = 0; i < recs.length; i++) {
            if (Number(recs[i].id) === id) {
                Ext.Msg.alert('Ошибка', 'Пользователь с данным ID уже зарегестрирован!');
                return;
            }
        }

        if (!(!id || !name || !email || name.trim(' ').length === 0 || email.trim(' ').length === 0)) {
            store.add({
                id: id,
                name: name,
                email: email
            });
            vm.set('id', null);
            vm.set('name', null);
            vm.set('email', null);
        } else {
            Ext.Msg.alert('Ошибка', 'Все поля должны быть заполнены!');
        }
    },

    onDeleteUser: function () {
        var store = Ext.getStore('usersStore');
        var selection = this.getView().getSelectionModel().getSelection();
        store.remove(selection);
    }
});