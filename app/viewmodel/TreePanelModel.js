Ext.define('Thesis.viewmodel.TreePanelModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.treepanel',

    stores: {
        treeStore: {
            type: 'tree',

            fields: [{
                name: 'text',
                //mapping: 'name'
            }],

            root: {
                expanded: true,
                children: [
                    { text: 'detention', leaf: true },
                    { text: 'homework', expanded: true, children: [
                            { text: 'book report', leaf: true },
                            { text: 'algebra', leaf: true}
                        ] },
                    { text: 'buy lottery tickets', leaf: true }
                ]
            },

            proxy: {
                type: 'memory',
                autoLoad: true,
                reader: {
                    typeProperty: 'mtype'
                }
            }
        }
    },


    data: {
        /* This object holds the arbitrary data that populates the ViewModel and is then available for binding. */
    }
});