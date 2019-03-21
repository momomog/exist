Ext.define('Thesis.controller.UsedController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.used',

    requires: [
        'Thesis.view.used.UsedWindow'
    ],

    onCreateWindow: function () {
        var myWin = Ext.create('Thesis.view.used.UsedWindow');
        myWin.show();
    },

    onAdd: function () {
        var vm = this.getViewModel();
        var store = Ext.getStore('usedStore');
        var used = vm.get('used');
        if (!(!used)) {
            store.add({
                used: used
            });
            vm.set('used', null);
        } else {
            Ext.Msg.alert('Ошибка', 'Все поля должны быть заполнены!');
        }
    },

    onDeleteUser: function () {
        var store = Ext.getStore('usedStore');
        var selection = this.getView().getSelectionModel().getSelection();
        store.remove(selection);
    }
});