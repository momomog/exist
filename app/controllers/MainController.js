Ext.define('Thesis.controller.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.mainC',


    onShowAutorizationPanel(){
        var autorizationForm = Ext.create('Thesis.views.main.AutorizationForm');
        var size = Ext.Element.getViewSize();
        autorizationForm.showAt(size.width/2,size.height/2.5);
    }
});
