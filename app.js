Ext.application({
    extend: 'Ext.app.Application',

    name: 'Thesis',

    requires: [
        'Thesis.view.main.Main'
    ],

    mainView: 'Thesis.view.main.Main'
});
