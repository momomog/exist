Ext.define('Thesis.store.TechnologyStore', {
    extend: 'Ext.data.Store',

    alias: 'store.technology',
    storeId: 'technologyStore',
    model: 'Thesis.model.Technology',

    proxy: {
        type: 'ajax',
        autoLoad: true,
        url: 'http://localhost:9999/spring/technologies',
        reader: {
            type: 'json',
            rootProperty: 'technologies'
        }
    }
});
