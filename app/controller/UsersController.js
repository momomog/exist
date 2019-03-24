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
        var name = vm.get('name');
        var email = vm.get('email');
        var recs = store.getRange();

        if (recs.length === 0) {
           var id = 0;
        } else {
            id = recs[recs.length - 1].id;
        }

        if (!(!name || !email || name.trim(' ').length === 0 || email.trim(' ').length === 0)) {
            store.add({
                id: ++id,
                name: name,
                email: email
            });
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