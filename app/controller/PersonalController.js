Ext.define('Thesis.controller.PersonalController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.personal',

    requires: [
        'Thesis.view.personal.PersonalWindow'
    ],

    onCreateWindow: function () {
        var myWin = Ext.create('Thesis.view.personal.PersonalWindow');
        myWin.show();
    },

    onPersonalsUpdate: function () {
        Ext.Ajax.request({
            url: 'http://localhost:8080/first',
            method: 'POST',
            params: {
                data: Ext.encode({"dataBase": "personals", "operation": "personalsUpdate"})
            },
            success: function (response) {
                response = Ext.decode(response.responseText);
                var store = Ext.getStore('personalStore');
                store.removeAll();
                out: if (response.success) {
                    if (response.personals === undefined) {
                        break out;
                    } else {
                        for (var i = 0; i < response.personals.length; i++) {
                            store.add({
                                id: response.personals[i].id,
                                technology: response.personals[i].technology,
                                skill: response.personals[i].skill,
                                used: response.personals[i].used,
                                commentary: response.personals[i].commentary,
                                Name: response.personals[i].name
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

    onAddPersonal: function () {
        var vm = this.getViewModel();
        var store = Ext.getStore('personalStore');

        var name = this.lookupReference('nameCombo').getValue();
        var tech = this.lookupReference('technologyCombo').getValue();
        var skill = this.lookupReference('skillCombo').getValue();
        var used = this.lookupReference('usedCombo').getValue();
        var commentary = vm.get('commentary');

        if (!(!name || !tech || !skill || !used)) {
            Ext.Ajax.request({
                url: 'http://localhost:8080/first',
                method: 'POST',
                params: {
                    data: Ext.encode({
                        "dataBase": "personals",
                        "operation": "addPersonalToDB",
                        "name": name,
                        "technology": tech,
                        "skill": skill,
                        "used": used,
                        "commentary": commentary
                    })
                },
                scope: this,
                success: function (response) {
                    response = Ext.decode(response.responseText);
                    if (response.success) {
                        this.onPersonalsUpdate();
                    } else {
                        Ext.MessageBox.alert('Ошибка добавления', response.message);
                    }
                },
                failure: function (err) {
                    Ext.MessageBox.alert('Ошибка!!', err);
                }
            });
            vm.set('commentary', null);
            this.view.hide();
        } else {
            Ext.Msg.alert('Ошибка', 'Все поля должны быть заполнены!');
        }
    },

    onDeletePersonal: function () {
        var store = Ext.getStore('personalStore');
        var grid = Ext.ComponentQuery.query('#personalGrid')[0];
        var id = grid.getSelectionModel().lastSelected.id;

        Ext.Ajax.request({
            url: 'http://localhost:8080/first',
            method: 'POST',
            params: {
                data: Ext.encode({"dataBase": "personals", "operation": "deletePersonal", "id": id})
            },
            scope: this,
            success: function (response) {
                response = Ext.decode(response.responseText);
                if (response.success) {
                    this.onPersonalsUpdate();
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