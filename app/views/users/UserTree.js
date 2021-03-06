Ext.define('Thesis.view.users.UserTree', {
    extend: 'Ext.tree.Panel',

    controller: 'users',

    store: {
        type: 'userTreeStore'
    },

    title: 'Дерево пользователя',
    itemId: 'userTree',

    width: 1260,
    height: 750,
    rootVisible: true,
    floating: true,

    buttons: [{
        text: 'Отмена',
        iconCls: 'x-fa fa-times',
        handler: 'onCancelForm'
    }]
});