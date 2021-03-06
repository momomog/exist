Ext.define('Thesis.store.PersonalStore', {
    extend: 'Ext.data.Store',
    model: 'Thesis.model.Personal',

    alias: 'store.personal',
    storeId: 'personalStore',
    groupField: 'Name',
    autoLoad: true,
    autoSync: true,

    proxy: {
        type: 'ajax',
        autoLoad: true,
        url: 'http://localhost:9999/spring/personals',
        reader: {
            type: 'json',
            rootProperty: 'personals'
        }
    }
});
