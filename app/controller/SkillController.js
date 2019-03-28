Ext.define('Thesis.controller.SkillController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.skill',

    requires: [
        'Thesis.view.skill.SkillWindow'
    ],

    onCreateWindow: function () {
        var myWin = Ext.create('Thesis.view.skill.SkillWindow');
        myWin.show();
    },

    onSkillsUpdate: function () {
        Ext.Ajax.request({
            url: 'http://localhost:8080/first',
            method: 'POST',
            params: {
                data: Ext.encode({"dataBase": "skills", "operation": "skillsUpdate"})
            },
            success: function (response) {
                response = Ext.decode(response.responseText);
                var store = Ext.getStore('skillStore');
                store.removeAll();
                out: if (response.success) {
                    if (response.skills === undefined) {
                        break out;
                    } else {
                        for (var i = 0; i < response.skills.length; i++) {
                            store.add({
                                id: response.skills[i].id,
                                name: response.skills[i].name
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

    onAddSkill: function () {
        var vm = this.getViewModel();
        var store = Ext.getStore('skillStore');
        var skill = vm.get('name');

        if (!(!skill || skill.trim(' ') === '')) {
            Ext.Ajax.request({
                url: 'http://localhost:8080/first',
                method: 'POST',
                params: {
                    data: Ext.encode({"dataBase": "skills", "operation": "addSkillToDB", "name": skill})
                },
                scope: this,
                success: function (response) {
                    response = Ext.decode(response.responseText);
                    if (response.success) {
                        this.onSkillsUpdate();
                    } else {
                        Ext.MessageBox.alert('Ошибка добавления', response.message);
                    }
                },
                failure: function (err) {
                    Ext.MessageBox.alert('Ошибка!!', err);
                }
            });
            vm.set('name', null);
            this.view.hide();
        } else {
            Ext.Msg.alert('Ошибка', 'Все поля должны быть заполнены!');
        }
    },

    onDeleteSkill: function () {
        var grid = Ext.ComponentQuery.query('#skillGrid')[0];
        var id = grid.getSelectionModel().lastSelected.id;

        Ext.Ajax.request({
            url: 'http://localhost:8080/first',
            method: 'POST',
            params: {
                data: Ext.encode({"dataBase": "skills", "operation": "deleteSkillFromDB", "id": id})
            },
            scope: this,
            success: function (response) {
                response = Ext.decode(response.responseText);
                if (response.success) {
                    this.onSkillsUpdate();
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