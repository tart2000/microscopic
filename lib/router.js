Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    waitOn: function() { 
        return Meteor.subscribe('projects'); 
        return Meteor.subscribe('hubs');
        return Meteor.subscribe('licences');
    },
    onStop: function(){
            Alert.clear();
        }
});

Router.map(function() { 
    this.route('homePage', {path: '/',

    });

    this.route('projectsList', {
        path:'/projects',

    });

    this.route('usersList', {
        path:'/community',
        waitOn: function() { 
            return [Meteor.subscribe('usersData'), Meteor.subscribe('userphotos')]; 
        },
        data: function() { 
            return Meteor.users.find(); 
        },
    });

    this.route('projectPage', { 
        path: '/projects/:_id', 
        waitOn: function() {
            return [Meteor.subscribe('comments', this.params._id), Meteor.subscribe('prjphotos'), Meteor.subscribe('userphotos')]; 
            // Attention, ici, on souscrit à toutes les images du monde... 
        },
        data: function() { 
            return Projects.findOne(this.params._id); 
        },
    });

    this.route('projectSubmit', { 
        path: '/submit', 
    });

    this.route('projectEdit', {
        path: '/projects/:_id/edit',
        waitOn: function() { 
            return [
                Meteor.subscribe('licences'), 
                Meteor.subscribe('prjphotos', {"metadata.projectID":this.params._id}), 
                Meteor.subscribe('usersData'),
                Meteor.subscribe('teams')
            ]; 
        },
        data: function() { 
            return Projects.findOne(this.params._id); 
        }, 
    });

    this.route('hubPage', {
        path:'/hubs/:_id',
        waitOn: function() { 
            return [Meteor.subscribe('usersData'), Meteor.subscribe('userphotos')]; 
            // ici, il faudrait appeler que les users qui sont dans ce hub... 
        },
        data: function() { 
            return Hubs.findOne(this.params._id); 
        },
    });

    this.route('hubsList', {
        path:'/hubs',

    });

    this.route('aboutPage', { 
        path: '/about',

    });

    this.route('userProfile', {
        path: '/users/:_id',
        // I need to change the subscription of the photos to only the user's one
        waitOn: function() { return [Meteor.subscribe('singleUser', this.params._id), Meteor.subscribe('userphotos')]; },
        data: function() { return Meteor.users.findOne(this.params._id); }
    });     

    this.route('modifyUserProfile', {
        path: '/users/:_id/modify',
        // I need to change the subscription of the photos to only the user's one 
        waitOn: function() { 
            return [
                Meteor.subscribe('modifySingleUser', this.params._id), 
                Meteor.subscribe('modifyUserPhoto', this.params._id),
                Meteor.subscribe('subscribeToHub')
            ]; 
        },
        data: function() { return Meteor.users.findOne(this.params._id); },
        onBeforeAction: function() {
            var currentUser = Meteor.user();

            if (!currentUser) {
                alert('Dude, this is not your profile! Go create your own!');
                Router.go('homePage');
                return;
            }

            if (currentUser._id !== this.params._id) {
                alert('Dude, this is not your profile! Go back to your own!');
                Router.go('userProfile', {_id: currentUser._id});
                return;
            }
        }
    });     

});

Router.onBeforeAction('loading');
