Template.projectSubmit.events({ 
    'submit': function(e) {
        console.log(e);
        e.preventDefault();
    
    var project = {
        title: $(e.target).find('[id=title]').val(), 
        baseline: $(e.target).find('[id=baseline]').val()
    }

    project._id = Projects.insert(project);
        Router.go('projectPage', project);
    }
});