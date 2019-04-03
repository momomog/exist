Ext.define('Thesis.controller.UsersController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.users',

    mixins: {
        personal: 'Thesis.controller.PersonalController'
    },

    state: {
        isOpenToolbar: true,
        toolbarCount: 0,
        phonesCount: 0
    },

    onCreateForm: function () {
        var grid = Ext.ComponentQuery.query('#usersGrid')[0];
        grid.hide();
        var myForm = Ext.create('Thesis.view.users.UserForm');
        myForm.showAt(265, 0);
    },

    onCancelForm: function () {
        this.view.hide();
        var grid = Ext.ComponentQuery.query('#usersGrid')[0];
        grid.show();
    },

    addPhoneToStore: function () {
        var vm = this.getViewModel();
        var phone = vm.get('phone');
        var phoneCode = vm.get('phoneCode');

        if (!(phone === null || phoneCode === null)) {
            var phonesStore = vm.get('phonesStore');
            if (!phonesStore.find('number', phoneCode + ' ' + phone)) {
                Ext.toast('Данный номер уже зарегестрирован для пользователя!');
            } else {
                phonesStore.add({number: phoneCode + ' ' + phone});
                vm.set('phonesStoreValue', phoneCode + ' ' + phone);
                Ext.toast('Добавлено!');
            }
        } else {
            Ext.toast('Выберете код и введите корректный номер телефона!');
        }

    },

    deletePhoneFromStore: function () {
        var vm = this.getViewModel();
        var phone = vm.get('phonesStoreValue');
        var phonesStore = vm.get('phonesStore');
        phonesStore.removeAt(phonesStore.find('number', phone));
        vm.set('phonesStoreValue', null);
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
        var phonesStore = vm.get('phonesStore');
        var allRecords = phonesStore.getData().getRange();
        var allUserPhones = '';

        if (allRecords.length !== 0) {
            for (var i = 0; i < allRecords.length; i++) {
                allUserPhones += allRecords[i].data.number + '; ';
            }
            allUserPhones = allUserPhones.slice(0, -2);
        } else {
            allUserPhones = phoneCode + ' ' + phone;
        }

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
                        "phone": allUserPhones
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

    onUserEdit: function (record, element, rowIndex, e, eOpts) {
        var editPanel = Ext.create('Ext.form.Panel', {
            title: 'Редактирование',

            controller: 'users',
            viewModel: {
                data: {
                    name: null,
                    email: null,
                    phone: null,
                    phoneCode: null
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
                }
            },

            floating: true,
            frame: true,
            width: 1260,
            height: 750,

            items: [{
                xtype: 'fieldset',
                title: 'Информация',
                defaultType: 'textfield',
                itemId: 'fieldId',
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
                disabled: true,
                formBind: true
                // handler: 'onAddUser'
            }, {
                text: 'Отмена',
                iconCls: 'x-fa fa-times',
                handler: 'onCancelForm'
            }],

            listeners: {
                beforerender: function () {
                    // console.log(record);
                    // console.log(element);

                    var vm = this.getViewModel();
                    vm.set('name', element.data.name);
                    vm.set('email', element.data.email);

                    var phonesArray = element.data.phone.split('; ');

                    for (var i = 0; i < phonesArray.length; i++) {
                      var fieldId =  Ext.ComponentQuery.query('#fieldId')[0].add({
                            xtype: 'panel',
                            layout: 'hbox',
                            margin: '0 0 10 0',
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
                            }
                            ]
                            // renderTo: Ext.getBody()
                        });
                    }
                    var fstPhone = phonesArray[0].split(' ');
                    console.log(fieldId);

                    vm.set('phoneCode', fstPhone[0]);
                    vm.set('phone', fstPhone[1] + fstPhone[2].replace(/[^0-9]/gim, ''));

                }
            }
        });
        editPanel.showAt(265, 0);
    },

    // onUserEdit: function (roweditor, event) {
    //     var newName = event.newValues.name;
    //     var newEmail = event.newValues.email;
    //     var newPhone = event.newValues.phone;
    //     var id = event.newValues.id;
    //
    //     Ext.Ajax.request({
    //         url: 'http://localhost:8080/first',
    //         method: 'POST',
    //         params: {
    //             data: Ext.encode({
    //                 "dataBase": "users",
    //                 "operation": "updateUser",
    //                 "name": newName,
    //                 "email": newEmail,
    //                 "phone": newPhone,
    //                 "id": id
    //             })
    //         },
    //         scope: this,
    //         success: function (response) {
    //             response = Ext.decode(response.responseText);
    //             if (response.success) {
    //                 this.onUsersUpdate();
    //             } else {
    //                 Ext.MessageBox.alert('Ошибка при редактировании', response.message);
    //             }
    //         },
    //         failure: function (err) {
    //             Ext.MessageBox.alert('Ошибка!', err);
    //         }
    //     });
    // },

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
            tool[this.state.toolbarCount].hide();
            this.state.isOpenToolbar = true;
            this.state.toolbarCount++;
        }
    },

    onUserOpClear: function () {
        var tool = Ext.ComponentQuery.query('#tool');
        if (!(tool[this.state.toolbarCount] === undefined)) {
            tool[this.state.toolbarCount].hide();
            this.state.isOpenToolbar = true;
            this.state.toolbarCount++;
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
    phoneNumber: function (value) {
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
    init: function (c) {
        c.on('change', this.onChange, this);
    },
    onChange: function (c) {
        c.setValue(Ext.util.Format.phoneNumber(c.getValue()));
    }
});