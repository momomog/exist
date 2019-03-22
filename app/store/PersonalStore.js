Ext.define('Thesis.store.PersonalStore', {
    extend: 'Ext.data.Store',

    alias: 'store.personal',
    storeId: 'personalStore',

    fields: [
        'name', 'technology', 'skill', 'used', 'commentary'
    ],

    data: [{
        name: "Иван Иванов",
        technology: "Spring Framework",
        skill: "Только в теории",
        used: "Не более месяца назад",
        commentary: "Вникаю в основы"
    }
    ],

    proxy: {
        type: 'memory',
        autoLoad: true,
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});
