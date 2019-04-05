Ext.define('Thesis.store.UserTreeStore', {
    extend: 'Ext.data.TreeStore',
    alias: 'store.userTreeStore',
    // storeId: 'userTreeStore',

    fields: [{
        name: 'text',
        mapping: 'name'
    }],

    root: {
        leaf: false,
        expanded: true
    },

    proxy: {
        type: 'memory',
        autoLoad: true,
        reader: {
            typeProperty: 'mtype'
        }
    }
});