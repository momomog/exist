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

    onUsersUpdate: function () {
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
                out: if (response.success) {
                    if (response.users === undefined) {
                        break out;
                    } else {
                        for (var i = 0; i < response.users.length; i++) {
                            store.add({
                                id: response.users[i].id,
                                name: response.users[i].name,
                                email: response.users[i].email
                            });
                        }
                    }
                } else {
                    Ext.MessageBox.alert('Ошибка добавления', response.message);
                }
            },

            failure: function (err) {
                Ext.MessageBox.alert('Ошибка!', err);
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
                        this.onUsersUpdate();
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
            this.view.hide();
        } else {
            Ext.Msg.alert('Ошибка', 'Все поля должны быть заполнены!');
        }
    },


    onDeleteUser: function () {
        var store = Ext.getStore('usersStore');
        var grid = Ext.ComponentQuery.query('#usersGrid')[0];
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
                    this.onUsersUpdate();
                } else {
                    Ext.MessageBox.alert('Ошибка при удалении', response.message);
                }
            },
            failure: function (err) {
                Ext.MessageBox.alert('Ошибка!', err);
            }
        });
    }
});