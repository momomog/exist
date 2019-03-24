Ext.define('Thesis.store.PersonalStore', {
    extend: 'Ext.data.Store',

    alias: 'store.personal',
    storeId: 'personalStore',
    groupField: 'Имя',
    fields: [
        'name', 'technology', 'skill', 'used', 'commentary'
    ],

    data: [{
        name: "",
        technology: "Spring Framework",
        skill: "Только в теории",
        used: "Не более месяца назад",
        commentary: "Изучаю основы",
        Имя: 'Иван Иванов'
    }, {
        name: "",
        technology: "Swift",
        skill: "Немного на практике",
        used: "3 месяца назад",
        commentary: "",
        Имя: 'Петр Петров'
    }, {
        name: "",
        technology: "Swift",
        skill: "Немного на практике",
        used: "1 месяц назад",
        commentary: "",
        Имя: 'Иван Иванов'
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
