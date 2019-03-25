/**
 * Created by SFokin on 25.03.2019.
 */
Ext.define('Thesis.model.ModelForPersonalStore', {
    extend: 'Ext.data.Model',

    fields: [
        'name', 'technology', 'skill', 'used', 'commentary'
    ],

    proxy: {
        type: 'rest',
        // api: {
        //     create: 'technology',
        //     read: 'technology',
        //     destroy: 'technology'
        // },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        },
        writer: {
            type: 'json',
            writeAllFields: true
        }

    }
});