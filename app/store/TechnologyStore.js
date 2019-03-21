Ext.define('Thesis.store.TechnologyStore', {
    extend: 'Ext.data.Store',

    alias: 'store.technology',
    storeId: 'technologyStore',

    fields: [
        'technology'
    ],

    data: [{technology: "Spring Framework"},
        {technology: "ExtJs"},
        {technology: "PostgreSQL"},
        {technology: "Hibernate"},
        {technology: "React"},
        {technology: "MySQL"},
        {technology: "Swift"},
        {technology: "Java SE"},
        {technology: "C#"}],

    proxy: {
        type: 'memory',
        autoLoad: true,
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});
