Ext.define('Thesis.store.UsedStore', {
    extend: 'Ext.data.Store',

    alias: 'store.used',
    storeId: 'usedStore',

    fields: [
        'used'
    ],

    data: [{used: "Постоянно"},
        {used: "Не более месяца назад"},
        {used: "1 месяц назад"},
        {used: "3 месяца назад"},
        {used: "6 месяцев назад"},
        {used: "1 год назад"},
        {used: "Больше 1 года назад"}],

    proxy: {
        type: 'memory',
        autoLoad: true,
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});
