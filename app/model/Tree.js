Ext.define('Thesis.model.Tree', {
    extend: 'Ext.data.TreeModel',
    itemId: 'qwerty',
    childType: String,
    isModel: false,

    fields: [{
        name: 'text',
        mapping: 'name'
    }],

    proxy: {
        type: 'memory',
        autoLoad: true,
        reader: {
            typeProperty: 'mtype'
        }
    },


}, function () {
    Ext.data.NodeInterface.decorate(this);
    this.override({
        createNode: function (node) {
            // var me = this,
            //     childType = me.childType,
            //     store, storeReader, nodeProxy, nodeReader, reader, typeProperty,
            //     T = me.self;
            // // Passed node's internal data object
            // if (!node.isModel) {
            //     // Check this node type's childType configuration
            //     if (childType) {
            //         T = me.schema.getEntity(childType);
            //     } else // See if the reader has a typeProperty and use it if possible
            //     {
            //         store = me.getTreeStore();
            //         storeReader = store && store.getProxy().getReader();
            //         nodeProxy = me.getProxy();
            //         nodeReader = nodeProxy ? nodeProxy.getReader() : null;
            //         // If the node's proxy's reader was configured with a special typeProperty (property name which defines the child type name) use that.
            //         reader = !storeReader || (nodeReader && nodeReader.initialConfig.typeProperty) ? nodeReader : storeReader;
            //         if (reader) {
            //             typeProperty = reader.getTypeProperty();
            //             if (typeProperty) {
            //                 T = reader.getChildType(me.schema, node, typeProperty);
            //             }
            //         }
            //     }
            //     node = new T(node);
            // }
            // // The node may already decorated, but may not have been
            // // so when the model constructor was called. If not,
            // // setup defaults here
            if (!node.childNodes) {
                node.firstChild = node.lastChild = node.parentNode = node.previousSibling = node.nextSibling = null;
                node.childNodes = [];
            }
            return node;
        },

    });

});