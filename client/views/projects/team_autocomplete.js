Template.coreTeamEdit.settings = function() {
  return {
   position: "top",
   rules: [
     {
       collection: Meteor.users,
       field: "emails.0.address",
       template: Template.userDropdown
     }
   ]
  }
};

Template.facilitatorEdit.settings = function() {
  return {
   position: "top",
   rules: [
     {
       collection: Meteor.users,
       field: "emails.0.address",
       template: Template.userDropdown
     }
   ]
  }
};

Template.thanksEdit.settings = function() {
  return {
   position: "top",
   rules: [
     {
       collection: Meteor.users,
       field: "emails.0.address",
       template: Template.userDropdown
     }
   ]
  }
};

Template.coreTeamEdit.helpers({ 
  coreteam: function() {
    return Teams.find({"projectID": this._id, "role":"core"});
  },
});

Template.facilitatorEdit.helpers({ 
  facilitators: function() {
    return Teams.find({"projectID": this._id, "role":"facilitator"});
  },
});

Template.thanksEdit.helpers({ 
  thanksTeam: function() {
    return Teams.find({"projectID": this._id, "role":"thanks"});
  },
});
