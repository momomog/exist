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
        if (!(!id || !name || !email)) {
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