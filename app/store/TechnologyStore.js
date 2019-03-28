Ext.define('Thesis.store.TechnologyStore', {
    extend: 'Ext.data.Store',

    alias: 'store.technology',
    storeId: 'technologyStore',
    model: 'Thesis.model.Technology',

    proxy: {
        type: 'ajax',
        autoLoad: true,
        url: 'http://localhost:8080/first',
        reader: {
            type: 'json',
            rootProperty: 'technologies'
        },
        writer: {
            type: 'json',
            writeAllFields: true
        }
    }
});
