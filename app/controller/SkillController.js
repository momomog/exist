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
        var recs = store.getRange();

        for (var i = 0; i < recs.length; i++) {
            if (recs[i].data.skill === skill) {
                Ext.Msg.alert('Ошибка', 'Данный навык уже зарегестрирован!');
                return;
            }
        }
        if (!(!skill || skill.trim(' ') === '')) {
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