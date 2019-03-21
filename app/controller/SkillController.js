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

    onAdd: function () {
        var vm = this.getViewModel();
        var store = Ext.getStore('skillStore');
        var skill = vm.get('skill');
        if (!(!skill)) {
            store.add({
                skill: skill
            });
            vm.set('skill', null);
        } else {
            Ext.Msg.alert('Ошибка', 'Все поля должны быть заполнены!');
        }
    },

    onDeleteUser: function () {
        var store = Ext.getStore('skillStore');
        var selection = this.getView().getSelectionModel().getSelection();
        store.remove(selection);
    }
});