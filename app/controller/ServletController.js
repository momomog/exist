/**
 * Created by SFokin on 25.03.2019.
 */
Ext.define('Thesis.controller.ServletController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.servlet',

    views : [ 'Thesis.view.users.UserWindow' ],
    init : function() {
        console.log('Controller InIt');
        this.control({

//when the viewport is rendered
            'viewport > panel' : {
                render : this.onPanelRendered
            },
//when you click Submit button
            'regForm button[action=register]' : {
                click : this.onRegisterClick
            }
        });
    },
    onPanelRendered : function() {
//just a console log to show when the panel is rendered
        console.log('The panel was rendered');
    },

    onRegisterClick : function(button) {
//just a console log to show when the Login Ajax request starts
        console.log('onRegisterClick Ajax Request in progress');

        var form = button.up('form').getForm();
        if (form.isValid()) {
//create an AJAX request
            Ext.Ajax.request({
                url : 'register',
                method : 'POST',
                params : {
                    data: Ext.encode(form.getValues())
                },
                scope : this,
//method to call when the request is successful
                success : this.onRegisterSuccess,
//method to call when the request is a failure
                failure : this.onRegisterFailure
            });
        }
    },

    onRegisterFailure : function(err) {
//Alert the user about communication error
        Ext.MessageBox.alert('Error occured during registration',
            'Please try again!');
    },

    onRegisterSuccess : function(response, opts) {
//Received response from the server
        response = Ext.decode(response.responseText);
        if (response.success) {
            Ext.MessageBox.alert('Successful Registration', response.message);
        } else {
            Ext.MessageBox.alert('Registration failed', response.message);
        }
    }
});