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

    onAdd: function () {
        var vm = this.getViewModel();
        var store = Ext.getStore('technologyStore');
        var technology = vm.get('technology');
        if (!(!technology)) {
            store.add({
                technology: technology
            });
            vm.set('technology', null);
        } else {
            Ext.Msg.alert('Ошибка', 'Все поля должны быть заполнены!');
        }
    },

    onDeleteUser: function () {
        var store = Ext.getStore('technologyStore');
        var selection = this.getView().getSelectionModel().getSelection();
        store.remove(selection);
    }
});