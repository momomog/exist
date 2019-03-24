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

    onAddUser: function () {
        var vm = this.getViewModel();
        var store = Ext.getStore('personalStore');

        var name = this.lookupReference('nameCombo').getValue();
        var tech = this.lookupReference('technologyCombo').getValue();
        var skill = this.lookupReference('skillCombo').getValue();
        var used = this.lookupReference('usedCombo').getValue();
        var commentary = vm.get('commentary');
        var recs = store.getRange();

        if (!name || !tech || !skill || !used) {
            Ext.Msg.alert('Ошибка', 'Все поля должны быть выбраны!');
            return;
        }

        for (var i = 0; i < recs.length; i++) {
            if (recs[i].data.Имя === name && recs[i].data.technology === tech) {
                Ext.Msg.alert('Ошибка', name + ': данная технология уже зарегестрирована!');
                return;
            }
        }

        store.add({
            technology: tech,
            skill: skill,
            used: used,
            commentary: commentary,
            Имя: name
        });
        vm.set('commentary', null);
    },

    onDeleteUser: function () {
        var store = Ext.getStore('personalStore');
        var selection = this.getView().getSelectionModel().getSelection();
        store.remove(selection);
    }
});