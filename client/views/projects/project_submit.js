Template.projectSubmit.events({ 
    'submit': function(e) {
        e.preventDefault();

        projectCount = projectCount + 1;
        console.log(projectCount);

    var project = {
        title: $(e.target).find('[id=title]').val(), 
        baseline: $(e.target).find('[id=baseline]').val(),
        edition: $(e.target).find('[id=edition]').val(),
        team: []
    }

    project._id = Projects.insert(project);
    Router.go('projectPage', project);
    Alert.add('your project has been created!', 'success');
    }
});