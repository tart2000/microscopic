Template.projectSubmit.events({ 
    'submit': function(e) {
        e.preventDefault();


    var project = {
        title: $(e.target).find('[id=title]').val(), 
        baseline: $(e.target).find('[id=baseline]').val(),
        hub: $(e.target).find('[id=hub]').val(),
        team: []
    }

    project._id = Projects.insert(project);
    Router.go('projectPage', project);
    Alert.add('your project has been created!', 'success');
    }
});

Template.projectSubmit.helpers({ 
    hubs: function() {
        return Hubs.find(); 
    }
});
