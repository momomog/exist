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

            store.add({
                name: name,
                technology: tech,
                skill: skill,
                used: used,
                commentary: commentary
            });
            vm.set('commentary', null);

            // Ext.Msg.alert('Ошибка', 'Все поля должны быть заполнены!');
        store.sync();
store.refresh();
    },

    onDeleteUser: function () {
        var store = Ext.getStore('personalStore');
        var selection = this.getView().getSelectionModel().getSelection();
        store.remove(selection);
    }
});