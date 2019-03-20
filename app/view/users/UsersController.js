Ext.define('Thesis.view.users.UsersController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.users',

    requires: [
        'Thesis.view.users.UserWindow'
    ],

    viewModel: 'main',

    onAdd: function () {
        var myWin = Ext.create('Thesis.view.users.UserWindow');
        myWin.show();
    },

    onAddUser: function () {
        var vm = this.getViewModel();
        var store = Ext.getStore('usersStore');
        store.add({
            id: vm.get('id'),
            name: vm.get('name'),
            email: vm.get('email')
        });
    },

    onDelete: function () {

    }

});