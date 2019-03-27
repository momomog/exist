Ext.define('Thesis.store.PersonalStore', {
    extend: 'Ext.data.Store',
    model: 'Thesis.model.Personal',

    alias: 'store.personal',
    storeId: 'personalStore',
    groupField: 'Name',
    autoLoad: true,
    autoSync: true,

    data: [{
        name: "",
        technology: "Spring Framework",
        skill: "Только в теории",
        used: "Не более месяца назад",
        commentary: "Изучаю основы",
        Name: 'Иван Иванов'
    }, {
        name: "",
        technology: "Swift",
        skill: "Немного на практике",
        used: "3 месяца назад",
        commentary: "",
        Name: 'Петр Петров'
    }, {
        name: "",
        technology: "Swift",
        skill: "Немного на практике",
        used: "1 месяц назад",
        commentary: "",
        Name: 'Иван Иванов'
    }
    ],

    proxy: {
        type: 'rest',
        autoLoad: true,
        url: 'http://localhost:8080/first',
        reader: {
            type: 'json',
            rootProperty: 'data'
        },
        writer: {
            type: 'json',
            writeAllFields: true
        }
    }
});
