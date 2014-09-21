Template.projectEdit.events({ 
    'submit form': function(e) {
        e.preventDefault();
        var currentProjectId = this._id;
        var projectProperties = {
            title: $(e.target).find('[name=title]').val(), baseline: $(e.target).find('[name=baseline]').val()
        };
        Projects.update(currentProjectId, {$set: projectProperties}, function(error) { if (error) {
            // display the error to the user
            alert(error.reason); } else {
                Router.go('projectPage', {_id: currentProjectId});
            }
        }); },
    'click .delete': function(e) { e.preventDefault();
        if (confirm("Delete this project?")) {
            var currentProjectId = this._id;
            Projects.remove(currentProjectId);
            Router.go('projectsList');
        }
    },
    'click .cancel': function(e) { 
        e.preventDefault();
        Router.go('projectPage', {_id: this._id});
    }
});