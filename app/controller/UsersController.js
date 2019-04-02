Ext.define('Thesis.controller.UsersController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.users',

    mixins: {
        personal: 'Thesis.controller.PersonalController'
    },

    state: {
        isOpenToolbar: true,
        count: 0
    },

    onCreateForm: function () {
        var grid = Ext.ComponentQuery.query('#usersGrid')[0];
        grid.hide();
        var myForm = Ext.create('Thesis.view.users.UserForm');
        myForm.showAt(265, 0);
        myForm.show();
    },

    onCancelForm: function () {
        this.view.hide();
        var grid = Ext.ComponentQuery.query('#usersGrid')[0];
        grid.show();
    },

    onUsersUpdate: function () {
        Ext.Ajax.request({
            url: 'http://localhost:8080/first',
            method: 'POST',
            params: {
                data: Ext.encode({
                    "dataBase": "users",
                    "operation": "usersUpdate"
                })
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
                                email: response.users[i].email,
                                phone: response.users[i].phone
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
        var phone = vm.get('phone');
        var phoneCode = vm.get('phoneCode');

        if (!(!name || !email || !phone || name.trim(' ').length === 0 || email.trim(' ').length === 0)) {
            Ext.Ajax.request({
                url: 'http://localhost:8080/first',
                method: 'POST',
                params: {
                    data: Ext.encode({
                        "dataBase": "users",
                        "operation": "addNewUser",
                        "name": name,
                        "email": email,
                        "phone": phoneCode + ' ' + phone
                    })
                },
                scope: this,
                success: function (response) {
                    response = Ext.decode(response.responseText);
                    if (response.success) {
                        this.onUsersUpdate();
                        vm.set('name', null);
                        vm.set('email', null);
                        vm.set('phone', null);
                        this.view.close();
                        var grid = Ext.ComponentQuery.query('#usersGrid')[0];
                        grid.show();
                    } else {
                        Ext.MessageBox.alert('Ошибка добавления', response.message);
                        vm.set('email', null);
                    }
                },
                failure: function (err) {
                    Ext.MessageBox.alert('Ошибка!!', err);
                }
            });
        } else {
            Ext.Msg.alert('Ошибка', 'Все поля должны быть заполнены!');
        }
    },

    onDeleteUser: function () {
        var store = Ext.getStore('usersStore');
        var grid = Ext.ComponentQuery.query('#usersGrid')[0];
        var name = grid.getSelectionModel().lastSelected.data.name;
        var id = grid.getSelectionModel().lastSelected.id;
        Ext.Ajax.request({
            url: 'http://localhost:8080/first',
            method: 'POST',
            params: {
                data: Ext.encode({"dataBase": "users", "operation": "deleteUser", "id": id, "name": name})
            },
            scope: this,
            success: function (response) {
                response = Ext.decode(response.responseText);
                if (response.success) {
                    this.onUsersUpdate();
                    this.onPersonalsUpdate();
                } else {
                    Ext.MessageBox.alert('Ошибка при удалении', response.message);
                }
            },
            failure: function (err) {
                Ext.MessageBox.alert('Ошибка!', err);
            }
        });
    },

    onUserEdit: function (roweditor, event) {
        var newName = event.newValues.name;
        var newEmail = event.newValues.email;
        var newPhone = event.newValues.phone;
        var id = event.newValues.id;

        Ext.Ajax.request({
            url: 'http://localhost:8080/first',
            method: 'POST',
            params: {
                data: Ext.encode({
                    "dataBase": "users",
                    "operation": "updateUser",
                    "name": newName,
                    "email": newEmail,
                    "phone": newPhone,
                    "id": id
                })
            },
            scope: this,
            success: function (response) {
                response = Ext.decode(response.responseText);
                if (response.success) {
                    this.onUsersUpdate();
                } else {
                    Ext.MessageBox.alert('Ошибка при редактировании', response.message);
                }
            },
            failure: function (err) {
                Ext.MessageBox.alert('Ошибка!', err);
            }
        });
    },

    onUserOp: function (e, target, view, record, item, index, event) {
        Ext.getDoc().on('contextmenu', function (ev) {
            ev.preventDefault();
        });
        if (this.state.isOpenToolbar) {
            var toolBar = Ext.create('Ext.toolbar.Toolbar', {
                    width: 260,
                    height: 46,
                    floating: true,
                    itemId: 'tool',
                    items: [{
                        text: 'Удалить пользователя',
                        iconCls: 'x-fa fa-trash-o',
                        scope: this,
                        handler: function () {
                            this.onDeleteUser();
                            toolBar.hide();
                        }
                    }, {
                        iconCls: 'x-fa fa-times',
                        handler: function () {
                            toolBar.hide();
                        }
                    }]
                }
            );
            toolBar.showAt(event.getXY());
            this.state.isOpenToolbar = false;
        } else {
            var tool = Ext.ComponentQuery.query('#tool');
            tool[this.state.count].hide();
            this.state.isOpenToolbar = true;
            this.state.count++;
        }
    },

    onUserOpClear: function () {
        var tool = Ext.ComponentQuery.query('#tool');
        if (!(tool[this.state.count] === undefined)) {
            tool[this.state.count].hide();
            this.state.isOpenToolbar = true;
            this.state.count++;
        }
    }
});

Ext.apply(Ext.form.VTypes, {
    'phoneText': 'Неверный номер телефона. Необходимый формат: (123) 456-7890',
    'phoneMask': /[\-\+0-9\(\)\s\.Ext]/,
    'phoneRe': /^(\({1}[0-9]{3}\){1}\s{1})([0-9]{3}[-]{1}[0-9]{4})$|^(((\+44)? ?(\(0\))? ?)|(0))( ?[0-9]{3,4}){4}$|^Ext. [0-9]+$/,
    'phone': function (v) {
        return this.phoneRe.test(v);
    }
});

Ext.apply(Ext.util.Format, {
    phoneNumber: function(value) {
        var phoneNumber = value.replace(/\./g, '').replace(/-/g, '').replace(/[^0-9]/g, '');

        if (phoneNumber != '' && phoneNumber.length == 10) {
            return '(' + phoneNumber.substr(0, 3) + ') ' + phoneNumber.substr(3, 3) + '-' + phoneNumber.substr(6, 4);
        } else {
            return value;
        }
    }
});

Ext.namespace('Ext.ux.plugin');

Ext.ux.plugin.FormatPhoneNumber = Ext.extend(Ext.form.TextField, {
    init: function(c) {
        c.on('change', this.onChange, this);
    },
    onChange: function(c) {
        c.setValue(Ext.util.Format.phoneNumber(c.getValue()));
    }
});