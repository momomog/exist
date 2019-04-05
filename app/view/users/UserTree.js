Ext.define('Thesis.view.users.UserTree', {
    extend: 'Ext.tree.Panel',

    controller: 'users',
    viewmodel:  {
        type: 'users'
    },

    store: {
        type: 'userTreeStore'
    },

    // bind:{
    //     store: '{treeStore}'
    // },

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