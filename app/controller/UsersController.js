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

    onUpdate: function () {
        Ext.Ajax.request({
            url: 'http://localhost:8080/first',
            method: 'POST',
            params: {
                data: Ext.encode({"dataBase": "users", "operation": "usersUpdate"})
            },
            success: function (response) {
                response = Ext.decode(response.responseText);
                var store = Ext.getStore('usersStore');
                store.removeAll();
                if (response.success) {
                    for (var i = 0; i < response.users.length; i++) {
                        store.add({
                            id: response.users[i].id,
                            name: response.users[i].name,
                            email: response.users[i].email
                        });
                    }
                } else {
                    Ext.MessageBox.alert('Ошибка добавления', response.message);
                }
            },

            failure: function (err) {
                Ext.MessageBox.alert('Ошибка!!', err);
            }
        });

    },

    onAddUser: function () {
        var vm = this.getViewModel();
        var store = Ext.getStore('usersStore');
        var name = vm.get('name');
        var email = vm.get('email');

        if (!(!name || !email || name.trim(' ').length === 0 || email.trim(' ').length === 0)) {
            Ext.Ajax.request({
                url: 'http://localhost:8080/first',
                method: 'POST',
                params: {
                    data: Ext.encode({"dataBase": "users", "operation": "addNewUser", "name": name, "email": email})
                },
                scope: this,
                success: function (response) {
                    response = Ext.decode(response.responseText);
                    if (response.success) {
                        this.onUpdate();
                    } else {
                        Ext.MessageBox.alert('Ошибка добавления', response.message);
                    }
                },
                failure: function (err) {
                    Ext.MessageBox.alert('Ошибка!!', err);
                }
            });
            vm.set('name', null);
            vm.set('email', null);
        } else {
            Ext.Msg.alert('Ошибка', 'Все поля должны быть заполнены!');
        }
    },


    onDeleteUser: function (record) {
        var store = Ext.getStore('usersStore');
        var grid = Ext.ComponentQuery.query('#theGrid')[0];
        var id = grid.getSelectionModel().lastSelected.id;


        Ext.Ajax.request({
            url: 'http://localhost:8080/first',
            method: 'POST',
            params: {
                data: Ext.encode({"dataBase": "users", "operation": "deleteUser", "id": id})
            },
            scope: this,
            success: function (response) {
                response = Ext.decode(response.responseText);
                if (response.success) {
                    this.onUpdate();
                } else {
                    Ext.MessageBox.alert('Ошибка удаления', response.message);
                }
            },
            failure: function (err) {
                Ext.MessageBox.alert('Ошибка!!', err);
            }
        });
    }
});