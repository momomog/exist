Ext.define('Thesis.controller.TechnologyController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.technology',

    requires: [
        'Thesis.view.technology.TechnologyWindow'
    ],

    onCreateWindow: function () {
        var myWin = Ext.create('Thesis.view.technology.TechnologyWindow');
        myWin.show();
    },

    onTechnologiesUpdate: function () {
        Ext.Ajax.request({
            url: 'http://localhost:8080/first',
            method: 'POST',
            params: {
                data: Ext.encode({"dataBase": "technologies", "operation": "technologiesUpdate"})
            },
            success: function (response) {
                response = Ext.decode(response.responseText);
                var store = Ext.getStore('technologyStore');
                store.removeAll();
                out: if (response.success) {
                    if (response.technologies === undefined) {
                        break out;
                    } else {
                        for (var i = 0; i < response.technologies.length; i++) {
                            store.add({
                                id: response.technologies[i].id,
                                name: response.technologies[i].name
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

    onAddTechnology: function () {
        var vm = this.getViewModel();
        var store = Ext.getStore('technologyStore');
        var technology = vm.get('name');

        if (!(!technology || technology.trim(' ') === '')) {
            Ext.Ajax.request({
                url: 'http://localhost:8080/first',
                method: 'POST',
                params: {
                    data: Ext.encode({"dataBase": "technologies", "operation": "addTechnologyToDB", "name": technology})
                },
                scope: this,
                success: function (response) {
                    response = Ext.decode(response.responseText);
                    if (response.success) {
                        this.onTechnologiesUpdate();
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

    onDeleteTechnology: function () {
        var store = Ext.getStore('technologyStore');
        var grid = Ext.ComponentQuery.query('#technologyGrid')[0];
        var id = grid.getSelectionModel().lastSelected.id;

        Ext.Ajax.request({
            url: 'http://localhost:8080/first',
            method: 'POST',
            params: {
                data: Ext.encode({"dataBase": "technologies", "operation": "deleteTechnologyFromDB", "id": id})
            },
            scope: this,
            success: function (response) {
                response = Ext.decode(response.responseText);
                if (response.success) {
                    this.onTechnologiesUpdate();
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