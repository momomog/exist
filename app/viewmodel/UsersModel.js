Ext.define('Thesis.viewmodel.UsersModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.users',
    controller: 'users',

    data: {
        name: null,
        email: null,
        phone: null,
        phoneCode: null
    },

    // formulas: {
    //     phoneMask: {
    //         get: function (get) {
    //             return get('name') * 3;
    //         },
    //
    //         set: function (value) {
    //             this.set({
    //                 phoneMask: value * 10
    //             });
    //         }
    //     },
    //     addPhoneToStore:  function (get) {
    //             var code = get('phoneCode');
    //             var phone = get('phone');
    //             var phonesStore = get('phonesStore');
    //             phonesStore.add('number', code + phone);
    //     },
    //
    // },

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
            data: [
                // {"number": "+7546456"},
            ]
        }
    }
});
