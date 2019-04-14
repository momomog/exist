Ext.define('Thesis.store.UsedStore', {
    extend: 'Ext.data.Store',

    alias: 'store.used',
    storeId: 'usedStore',
    model: 'Thesis.model.Used',


    proxy: {
        type: 'ajax',
        autoLoad: true,
        url: 'http://localhost:9999/spring/lastused',
        reader: {
            type: 'json',
            rootProperty: 'useds'
        }
    }
});
