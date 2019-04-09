Ext.define('Thesis.viewmodel.TreePanelModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.treepanel',


    stores: {
        treeStore: {
            type: 'tree',
            model: 'Thesis.model.Tree',

            root: {
                expanded: true,
                // children: [
                //     { text: 'detention', leaf: true },
                //     { text: 'homework', expanded: true, children: [
                //             { text: 'book report', leaf: true },
                //             { text: 'algebra', leaf: true}
                //         ] },
                //     { text: 'buy lottery tickets', leaf: true }
                // ]
            }

        }
    },


});