Ext.define('Thesis.store.UserTreeStore', {
    extend: 'Ext.data.TreeStore',
    alias: 'store.userstore',
    //storeId: 'userstore',

    fields: [{
        name: 'text',
        mapping: 'name'
    }],

    root: {
        //     text: 'jyg',
        // expanded: true,
        // children: [
        //     {text: 'detention', leaf: true},
        //     {
        //         text: 'homework', expanded: true, children: [
        //             {text: 'book report', leaf: true},
        //             {text: 'algebra', leaf: true}
        //         ]
        //     },
        //     {text: 'buy lottery tickets', leaf: true}
        // ]
    },

    proxy: {
        type: 'memory',
        autoLoad: true,
        //url: 'http://localhost:8080/first',
        reader: {
            typeProperty: 'mtype'
            //type: 'json',
            //rootProperty: 'personals'
        }
    }
});