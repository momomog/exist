Ext.define('Thesis.viewmodel.UsersModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.users',
    controller: 'users',

    data: {
        name: null,
        email: null,
        phone: null,
        phoneCode: null,
        userName: null
    },

    stores: {
        codeStore: {
            data: [
                {"code": "+7"},
                {"code": "+375"},
                {"code": "+380"},
                {"code": "+994"},
                {"code": "+373"}
            ]
        },
        phonesStore: {
        }
    }
});
