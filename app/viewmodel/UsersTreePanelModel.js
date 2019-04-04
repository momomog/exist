
Ext.define('Thesis.viewmodel.UsersTreePanelModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.userstreepanel',

    stores: {
        /*
        A declaration of Ext.data.Store configurations that are first processed as binds to produce an effective
        store configuration. For example:

        users: {
            model: 'UsersTreePanel',
            autoLoad: true
        }
        */
    },

    data: {
        userName: null
    }
});