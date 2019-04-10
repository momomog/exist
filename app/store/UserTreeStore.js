Ext.define('Thesis.store.UserTreeStore', {
    extend: 'Ext.data.TreeStore',
    alias: 'store.userTreeStore',
    storeId: 'userTreeStore',

    fields: [{
        name: 'text',
        mapping: 'name'
    }],

    root: {
        expanded: true,
    },

    autoLoad: true,
    autoSync: true,

    proxy: {
        type: 'localstorage',
        autoLoad: true,
        autoSync: true,
        reader: {
            typeProperty: 'mtype'
        }
    }
});