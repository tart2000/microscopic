Template.projectSubmit.events({ 
    'submit': function(e) {
        e.preventDefault();
    
    var project = {
        title: $(e.target).find('[id=title]').val(), 
        baseline: $(e.target).find('[id=baseline]').val(),
        edition: $(e.target).find('[id=edition]').val(),
        team: []
    }

    project._id = Projects.insert(project);
        Router.go('projectPage', project);
    }
});