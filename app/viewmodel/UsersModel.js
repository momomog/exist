Ext.define('Thesis.viewmodel.UsersModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.users',
    controller: 'users',

    data: {
        name: null,
        email: null,
        phoneCode: null,
        phone: null
    }
});
