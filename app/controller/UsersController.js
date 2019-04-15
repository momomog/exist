Ext.define('Thesis.controller.UsersController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.users',

    ItemId: 'userController',

    mixins: {
        personal: 'Thesis.controller.PersonalController'
    },

    state: {
        isOpenToolbar: true,
        toolbarCount: 0,
        editPanelCount: 0,
        treePanelCount: 0
    },

    onCreateTreepanel: function (btn) {
        var grid = Ext.ComponentQuery.query('#usersGrid')[0];

        if (btn.text === 'Показать знания всех пользователей') {
            grid.hide();
            var allUsersTree = Ext.create('Thesis.view.users.UserTree');
            allUsersTree.title = 'Дерево пользователей';
            var currentTree = Ext.ComponentQuery.query('#userTree')[this.state.treePanelCount];
            this.state.treePanelCount++;
            var allUsersRootNode = currentTree.getRootNode();
            allUsersRootNode.data.text = 'Пользователи';

            var personalStore = Ext.getStore('personalStore');
            var personalStoreAllData = personalStore.getData().getRange();
            var userTreeStore = Ext.getStore('userTreeStore');

            here: for (var i = 0; i < personalStoreAllData.length; i++) {

                for (var j = 0; j < userTreeStore.getData().getRange().length; j++) {

                    if (userTreeStore.getData().getRange()[j].data.text === personalStoreAllData[i].data.Name) {
                        userTechnologyNode = userTreeStore.getData().getRange()[j].appendChild({
                            text: personalStoreAllData[i].data.technology,
                            leaf: true,
                            expanded: false
                        });
                        userSkillNode = userTechnologyNode.appendChild({
                            text: personalStoreAllData[i].data.skill,
                            leaf: true,
                            expanded: true
                        });
                        userLastUsedNode = userSkillNode.appendChild({
                            text: personalStoreAllData[i].data.used,
                            leaf: true
                        });
                        continue here;
                    }
                }
                var userNameNode = allUsersRootNode.appendChild({
                    text: personalStoreAllData[i].data.Name,
                    leaf: true,
                    expanded: true
                });
                var userTechnologyNode = userNameNode.appendChild({
                    text: personalStoreAllData[i].data.technology,
                    leaf: true,
                    expanded: false
                });
                var userSkillNode = userTechnologyNode.appendChild({
                    text: personalStoreAllData[i].data.skill,
                    leaf: true,
                    expanded: true
                });
                var userLastUsedNode = userSkillNode.appendChild({
                    text: personalStoreAllData[i].data.used,
                    leaf: true
                });
            }
            allUsersTree.showAt(265, 0);
        } else {
            if (grid.getSelectionModel().lastSelected === undefined) {
                Ext.toast('Необходимо выбрать пользователя!');
            } else {
                grid.hide();
                var myForm = Ext.create('Thesis.view.users.UserTree');
                var userName = grid.getSelectionModel().lastSelected.data.name;
                var tree = Ext.ComponentQuery.query('#userTree')[this.state.treePanelCount];
                this.state.treePanelCount++;

                userTreeStore = Ext.getStore('userTreeStore');
                var rootNode = userTreeStore.getRootNode();
                rootNode.data.text = userName;

                personalStore = Ext.getStore('personalStore');
                personalStoreAllData = personalStore.getData().getRange();

                for (i = 0; i < personalStoreAllData.length; i++) {
                    if (personalStoreAllData[i].data.Name === userName) {
                        userTechnologyNode = rootNode.appendChild({
                            text: personalStoreAllData[i].data.technology,
                            leaf: true,
                            expanded: true
                        });
                        userSkillNode = userTechnologyNode.appendChild({
                            text: personalStoreAllData[i].data.skill,
                            leaf: true,
                            expanded: true
                        });
                        userLastUsedNode = userSkillNode.appendChild({
                            text: personalStoreAllData[i].data.used,
                            leaf: true
                        });
                    }
                }
                myForm.showAt(265, 0);
            }
        }
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
            url: 'http://localhost:9999/spring/users/update',
            async: false,
            method: 'GET',
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
                url: 'http://localhost:9999/spring/users/add',
                async: false,
                method: 'POST',
                params: {
                    name: name,
                    email: email,
                    phone: allUserPhones
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
                        Ext.toast(response.message);
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
        var grid = Ext.ComponentQuery.query('#usersGrid')[0];
        var name = grid.getSelectionModel().lastSelected.data.name;
        var id = grid.getSelectionModel().lastSelected.id;

        Ext.Ajax.request({
            url: 'http://localhost:9999/spring/users/delete',
            async: false,
            method: 'POST',
            params: {
                id: id,
                name: name
            },
            scope: this,
            success: function (response) {
                response = Ext.decode(response.responseText);
                if (response.success) {
                    this.onUsersUpdate();
                    this.onPersonalsUpdate();
                    Ext.toast(response.message);
                } else {
                    Ext.MessageBox.alert('Ошибка при удалении', response.message);
                }
            },
            failure: function (err) {
                Ext.MessageBox.alert('Ошибка!', err);
            }
        });
    },

    onCreateEditPanel: function (record, element) {
        var editPanel = Ext.create('Thesis.view.users.UserEditForm');

        var vm = editPanel.getViewModel();
        vm.set('name', element.data.name);
        vm.set('email', element.data.email);
        vm.set('id', element.data.id);
        var phonesArray = element.data.phone.split('; ');

        for (var i = 0; i < phonesArray.length; i++) {
            var phone = phonesArray[i].split(' ');

            Ext.ComponentQuery.query('#fieldId')[this.state.editPanelCount].add({
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
                    value: phone[0],
                    bind: {
                        store: '{codeStore}'
                    },
                    listeners: {
                        change: function (newValue, oldValue, eOpts) {
                            this.setValue(newValue.value);
                        }
                    }
                }, {
                    xtype: 'textfield',
                    name: 'phone',
                    vtype: 'phone',
                    validateOnChange: true,
                    value: phone[1] + ' ' + phone[2],
                    plugins: new Ext.ux.plugin.FormatPhoneNumber(),
                    listeners: {
                        change: function (newValue, oldValue, eOpts) {
                            this.setValue(newValue.value);
                        }
                    }
                }]
            });
        }

        this.state.editPanelCount++;
        editPanel.showAt(265, 0);
    },

    onEditUser: function () {
        var vm = this.getViewModel();
        var name = vm.get('name');
        var email = vm.get('email');
        var id = vm.get('id');

        var userPhones = '';
        var phonesArr = this.view.down('fieldset').items.items;

        for (var i = 1; i < phonesArr.length; i++) {
            var phC = phonesArr[i].items.items[0].rawValue;
            var ph1 = phonesArr[i].items.items[1].rawValue.substr(0, 5);
            var ph2 = phonesArr[i].items.items[1].rawValue.substr(5, 12);
            userPhones += phC + ' ' + ph1 + ph2 + '; ';
        }

        userPhones = userPhones.slice(0, -2);

        if (!(!name || !email || !userPhones || name.trim(' ').length === 0 || email.trim(' ').length === 0 || userPhones.trim(' ').length === 0)) {
            Ext.Ajax.request({
                url: 'http://localhost:9999/spring/users/updateData',
                async: false,
                method: 'POST',
                params: {
                    name: name,
                    email: email,
                    phone: userPhones,
                    id: id
                },
                scope: this,
                success: function (response) {
                    response = Ext.decode(response.responseText);
                    if (response.success) {
                        this.view.hide();
                        this.onUsersUpdate();
                        Ext.toast(response.message);
                    } else {
                        Ext.MessageBox.alert('Ошибка при сохранении', response.message);
                    }
                },
                failure: function (err) {
                    Ext.MessageBox.alert('Ошибка!', err);
                }
            });
        } else {
            Ext.Msg.alert('Ошибка', 'Все поля должны быть заполнены!');
        }
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

        if (phoneNumber !== '' && phoneNumber.length === 10) {
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