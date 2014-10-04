Template.coreTeamEdit.settings = function() {
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
        Teams.insert({
          "projectID": currentprojectID,
          userID: doc._id,
          user: doc.username,
          email:doc.emails[0].address,
          role: 'core'
        });
        $("#coreteam").val('');
       }
     }
   ]
  }
};

Template.facilitatorEdit.settings = function() {
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
        Teams.insert({
          "projectID": currentprojectID,
          userID: doc._id,
          user: doc.username,
          email:doc.emails[0].address,
          role: 'facilitator'
        });
        $("#facilitator").val('');
       }
     }
   ]
  }
};

Template.thanksEdit.settings = function() {
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
        Teams.insert({
          "projectID": currentprojectID,
          userID: doc._id,
          user: doc.username,
          email:doc.emails[0].address,
          role: 'thanks'
        });
        $("#thanks").val('');
       }
     }
   ]
  }
};

Template.coreTeamEdit.helpers({ 
  coreteam: function() {
    return Teams.find({"projectID": this._id, "role":"core"});
  },
  isRegistered: function(user) {

    if (user !== undefined)
      return true;
    else
      return false;
  }
});

Template.facilitatorEdit.helpers({ 
  facilitators: function() {
    return Teams.find({"projectID": this._id, "role":"facilitator"});
  },
  isRegistered: function(user) {

    if (user !== undefined)
      return true;
    else
      return false;
  }
});

Template.thanksEdit.helpers({ 
  thanksTeam: function() {
    return Teams.find({"projectID": this._id, "role":"thanks"});
  },
   isRegistered: function(user) {

    if (user !== undefined)
      return true;
    else
      return false;
  }
});

Template.coreTeamEdit.events({ 
  'click .add-member': function(e) {
    Teams.insert({
      "projectID": this._id,
      email: $("#coreteam").val(),
      role: 'core'
    });
    $("#coreteam").val('');
  },
  'click .delete-member':function(e) {
    Teams.remove(this._id);
  }
});

Template.facilitatorEdit.events({ 
  'click .add-facilitator': function(e) {
    Teams.insert({
      "projectID": this._id,
      email: $("#facilitator").val(),
      role: 'core'
    });
    $("#facilitator").val('');
  },
  'click .delete-member':function(e) {
    Teams.remove(this._id);
  }
});

Template.thanksEdit.events({ 
  'click .add-facilitator': function(e) {
    Teams.insert({
      "projectID": this._id,
      email: $("#thanks").val(),
      role: 'core'
    });
    $("#thanks").val('');
  },
  'click .delete-member':function(e) {
    Teams.remove(this._id);
  }
});
