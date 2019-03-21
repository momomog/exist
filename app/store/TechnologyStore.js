Ext.define('Thesis.store.TechnologyStore', {
    extend: 'Ext.data.Store',

    alias: 'store.technology',
    storeId: 'technologyStore',

    fields: [
        'name', 'technology'
    ],

    data: [{name: "Иван Иванов", technology: "Spring Framework, Hibernate"},
        {name: "Петр Петров", technology: "ExtJs, React, Angular"},
        {name: "Сидор Сидоров", technology: "SQL, MySQL, PostgreSQL, Oracle"}],

    proxy: {
        type: 'memory',
        autoLoad: true,
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});
