Ext.define('Thesis.model.UsersModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.users',

    requires: [
        'Thesis.store.UsersStore'
    ],

    data: {
        id: null,
        name: null,
        email: null
    }
});
