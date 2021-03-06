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
            url: 'http://localhost:9999/spring/personals/update',
            async: false,
            method: 'GET',
            success: function (response) {
                response = Ext.decode(response.responseText);
                var store = Ext.getStore('personalStore');
                store.removeAll();
                out: if (response.success) {
                    if (response.personals.length === 0) {
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
        var name = this.lookupReference('nameCombo').getValue();
        var tech = this.lookupReference('technologyCombo').getValue();
        var skill = this.lookupReference('skillCombo').getValue();
        var used = this.lookupReference('usedCombo').getValue();
        var commentary = vm.get('commentary');

        if (!(!name || !tech || !skill || !used)) {
            Ext.Ajax.request({
                url: 'http://localhost:9999/spring/personals/add',
                async: false,
                method: 'POST',
                params: {
                    name: name,
                    technology: tech,
                    skill: skill,
                    used: used,
                    commentary: commentary
                },
                scope: this,
                success: function (response) {
                    response = Ext.decode(response.responseText);
                    if (response.success) {
                        this.onPersonalsUpdate();
                        this.view.hide();
                        Ext.toast(response.message);
                    } else {
                        Ext.MessageBox.alert('Ошибка добавления', response.message);
                    }
                },
                failure: function (err) {
                    Ext.MessageBox.alert('Ошибка!', err);
                }
            });
            vm.set('commentary', null);
        } else {
            Ext.Msg.alert('Ошибка', 'Все поля должны быть заполнены!');
        }
    },

    onDeletePersonal: function () {
        var grid = Ext.ComponentQuery.query('#personalGrid')[0];
        var id = grid.getSelectionModel().lastSelected.id;

        Ext.Ajax.request({
            url: 'http://localhost:9999/spring/personals/delete',
            method: 'POST',
            params: {
                id: id
            },
            scope: this,
            success: function (response) {
                response = Ext.decode(response.responseText);
                if (response.success) {
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


    onPersonalEdit: function (roweditor, event) {
        var newTechnology = event.newValues.technology;
        var newSkill = event.newValues.skill;
        var newUsed = event.newValues.used;
        var newCommentary = event.newValues.commentary;
        var id = event.record.id;

        if (isNaN(newTechnology)) {
            var store = Ext.getStore('technologyStore').getRange();
            for (var i = 0; i < store.length; i++) {
                if (store[i].data.name === newTechnology) {
                    newTechnology = store[i].id;
                }
            }
        }
        if (isNaN(newSkill)) {
            store = Ext.getStore('skillStore').getRange();
            for (i = 0; i < store.length; i++) {
                if (store[i].data.name === newSkill) {
                    newSkill = store[i].id;
                }
            }
        }
        if (isNaN(newUsed)) {
            store = Ext.getStore('usedStore').getRange();
            for (i = 0; i < store.length; i++) {
                if (store[i].data.name === newUsed) {
                    newUsed = store[i].id;
                }
            }
        }

        Ext.Ajax.request({
            url: 'http://localhost:9999/spring/personals/updateData',
            async: false,
            method: 'POST',
            params: {
                id: id,
                technology: newTechnology,
                skill: newSkill,
                used: newUsed,
                commentary: newCommentary
            },
            scope: this,
            success: function (response) {
                response = Ext.decode(response.responseText);
                if (response.success) {
                    this.onPersonalsUpdate();
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