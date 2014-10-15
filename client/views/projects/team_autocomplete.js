Template.coreTeamEdit.helpers({
  coreteam: function() {
    return Teams.find({"projectID": this._id, "role":"core"});
  },
  isRegistered: function(user) {

    if (user !== '')
      return true;
    else
      return false;
  },
  settings: function() {
    var currentprojectID = this._id;
    return {
     position: "top",
     limit:5,
     rules: [
       {
         collection: Meteor.users,
         field: "emails.0.address",
         template: Template.userDropdown,
         noMatchTemplate: Template.noMatch,
         callback: function(doc) {
          var newMember = {
            'projectID': currentprojectID,
            'userID': doc._id,
            'user': doc.username,
            'email':doc.emails[0].address,
            'role': 'core'
          }

          Meteor.call('addMember', newMember, function(error){
            if (error) {
              if (error.error = 302) {
                Alert.add(error.reason, 'warning');
              } else {
                Alert.add(error.reason, 'danger');
                Router.go('projectPage', {_id: currentprojectID});
              }
            }
          });
          $("#coreteam").val('');
         }
       }
     ]
    }
  }
});


Template.facilitatorEdit.helpers({ 
  facilitators: function() {
    return Teams.find({"projectID": this._id, "role":"facilitator"});
  },
  isRegistered: function(user) {

    if (user !== '')
      return true;
    else
      return false;
  },
  settings: function() {
    var currentprojectID = this._id;
    return {
     position: "top",
     limit:5,
     rules: [
       {
         collection: Meteor.users,
         field: "emails.0.address",
         template: Template.userDropdown,
         noMatchTemplate: Template.noMatch,
         callback: function(doc) {
          var newMember = {
            'projectID': currentprojectID,
            'userID': doc._id,
            'user': doc.username,
            'email':doc.emails[0].address,
            'role': 'facilitator'
          }

          Meteor.call('addMember', newMember, function(error){
            if (error) {
              if (error.error = 302) {
                Alert.add(error.reason, 'warning');
              } else {
                Alert.add(error.reason, 'danger');
                Router.go('projectPage', {_id: currentprojectID});
              }
            }
          });
          $("#facilitator").val('');
         }
       }
     ]
    }
  }
});

Template.thanksEdit.helpers({ 
  thanksTeam: function() {
    return Teams.find({"projectID": this._id, "role":"thanks"});
  },
   isRegistered: function(user) {

    if (user !== '')
      return true;
    else
      return false;
  },
  settings: function() {
    var currentprojectID = this._id;
    return {
     position: "top",
     limit:5,
     rules: [
       {
         collection: Meteor.users,
         field: "emails.0.address",
         template: Template.userDropdown,
         noMatchTemplate: Template.noMatch,
         callback: function(doc) {
          var newMember = {
            'projectID': currentprojectID,
            'userID': doc._id,
            'user': doc.username,
            'email':doc.emails[0].address,
            'role': 'thanks'
          }

          Meteor.call('addMember', newMember, function(error){
            if (error) {
              if (error.error = 302) {
                Alert.add(error.reason, 'warning');
              } else {
                Alert.add(error.reason, 'danger');
                Router.go('projectPage', {_id: currentprojectID});
              }
            }
          });
          $("#thanks").val('');
         }
       }
     ]
    }
  }
});

Template.coreTeamEdit.events({ 
  'click .add-member': function(e) {
    var newMember = {
      "projectID": this._id,
      'userID': '',
      'user': '',
      email: $("#coreteam").val(),
      role: 'core'
    };

     Meteor.call('addMember', newMember, function(error){
      if (error) {
        if (error.error = 302) {
          Alert.add(error.reason, 'warning');
        } else {
          Alert.add(error.reason, 'danger');
          Router.go('homepage');
        }
      }
    });

    $("#coreteam").val('');
  },
  'click .delete-member':function(e) {
    var deletedMember = {
      'deleted': this._id,
      "projectID": this.projectID
      }

    Meteor.call('removeMember', deletedMember, function(error){
      if (error) {
        Alert.add(error.reason, 'danger');
        Router.go('homePage');
      }
    });
  }
});

Template.facilitatorEdit.events({ 
  'click .add-facilitator': function(e) {
    var newMember = {
      "projectID": this._id,
      'userID': '',
      'user': '',
      email: $("#facilitator").val(),
      role: 'facilitator'
    };

     Meteor.call('addMember', newMember, function(error){
      if (error) {
        if (error.error = 302) {
          Alert.add(error.reason, 'warning');
        } else {
          Alert.add(error.reason, 'danger');
          Router.go('homepage');
        }
      }
    });

    $("#facilitator").val('');
  },
  'click .delete-member':function(e) {
    var deletedMember = {
      'deleted': this._id,
      "projectID": this.projectID
      }

    Meteor.call('removeMember', deletedMember, function(error){
      if (error) {
        Alert.add(error.reason, 'danger');
        Router.go('homePage');
      }
    });
  }
});

Template.thanksEdit.events({ 
  'click .add-thanks': function(e) {
    var newMember = {
      "projectID": this._id,
      'userID': '',
      'user': '',
      email: $("#thanks").val(),
      role: 'thanks'
    };

     Meteor.call('addMember', newMember, function(error){
      if (error) {
        if (error.error = 302) {
          Alert.add(error.reason, 'warning');
        } else {
          Alert.add(error.reason, 'danger');
          Router.go('homepage');
        }
      }
    });

    $("#thanks").val('');
  },
  'click .delete-member':function(e) {
     var deletedMember = {
      'deleted': this._id,
      "projectID": this.projectID
      }

    Meteor.call('removeMember', deletedMember, function(error){
      if (error) {
        Alert.add(error.reason, 'danger');
        Router.go('homePage');
      }
    });
  }
});
