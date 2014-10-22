Template.projectSubmit.events({ 
    'submit': function(e) {
        e.preventDefault();

        var projectProperties = {
            title: $(e.target).find('[id=title]').val(), 
            baseline: $(e.target).find('[id=baseline]').val(),
            hub: $(e.target).find('[id=hub]').val(),
            hubID: $('#hub').children(":selected").attr('id'),
        }

        Meteor.call('createProject', projectProperties, function(error, id){
            if (error)
                Alert.add(error.reason, 'danger');
            else {
                Alert.add('your project has been created!', 'success');
                Router.go('projectPage', {'_id': id});
            }

        });
    }   
});

Template.projectSubmit.helpers({ 
    hubs: function() {
        return Hubs.find(); 
    }
});
