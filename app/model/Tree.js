Ext.define('Thesis.model.Tree', {
    extend: 'Ext.data.TreeModel',
    itemId: 'qwerty',
    childType: String,
    isModel: false,

    fields: [{
        name: 'text',
        mapping: 'name'
    }]
});