Ext.define('Thesis.controller.UsedController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.used',

    requires: [
        'Thesis.view.used.UsedWindow',
        'Thesis.store.UsedStore'
    ],

    onCreateWindow: function () {
        var myWin = Ext.create('Thesis.view.used.UsedWindow');
        myWin.show();
    },

    onUsedsUpdate: function () {
        Ext.Ajax.request({
            url: 'http://localhost:9999/spring/lastused/update',
            async: false,
            method: 'GET',
            success: function (response) {
                response = Ext.decode(response.responseText);
                var store = Ext.getStore('usedStore');
                store.removeAll();
                out: if (response.success) {
                    if (response.useds === undefined) {
                        break out;
                    } else {
                        for (var i = 0; i < response.useds.length; i++) {
                            store.add({
                                id: response.useds[i].id,
                                name: response.useds[i].name
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

    onAddUsed: function () {
        var vm = this.getViewModel();
        var used = vm.get('name');

        if (!(!used || used.trim(' ') === '')) {
            Ext.Ajax.request({
                url: 'http://localhost:9999/spring/lastused/add',
                async: false,
                method: 'POST',
                params: {
                        name: used
                },
                scope: this,
                success: function (response) {
                    response = Ext.decode(response.responseText);
                    if (response.success) {
                        this.onUsedsUpdate();
                        this.view.hide();
                    } else {
                        Ext.MessageBox.alert('Ошибка добавления', response.message);
                    }
                },
                failure: function (err) {
                    Ext.MessageBox.alert('Ошибка!!', err);
                }
            });
            vm.set('name', null);
        } else {
            Ext.Msg.alert('Ошибка', 'Все поля должны быть заполнены!');
        }
    },

    onDeleteUsed: function () {
        var grid = Ext.ComponentQuery.query('#usedGrid')[0];
        var id = grid.getSelectionModel().lastSelected.id;

        Ext.Ajax.request({
            url: 'http://localhost:9999/spring/lastused/delete',
            async: false,
            method: 'POST',
            params: {
                    id: id
            },
            scope: this,
            success: function (response) {
                response = Ext.decode(response.responseText);
                if (response.success) {
                    this.onUsedsUpdate();
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

    onUsedEdit: function (roweditor, event) {
        var newName = event.newValues.name;
        var id = event.record.id;

        Ext.Ajax.request({
            url: 'http://localhost:9999/spring/lastused/updateData',
            async: false,
            method: 'POST',
            params: {
                    name: newName,
                    id: id
            },
            scope: this,
            success: function (response) {
                response = Ext.decode(response.responseText);
                if (response.success) {
                    this.onUsedsUpdate();
                    Ext.toast(response.message);
                } else {
                    Ext.MessageBox.alert('Ошибка при редактировании', response.message);
                }
            },
            failure: function (err) {
                Ext.MessageBox.alert('Ошибка!', err);
            }
        });
    }
});