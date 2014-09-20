var projectsData = [ {
    title: 'Telescope',
    baseline:'something awesome',
    author: 'Sacha Grief',
}, {
    title: 'Meteor',
    baseline : 'building awesome apps easily',
    author: 'Tom Coleman',
}, {
    title: 'PingPong',
    baseline : 'a one-way trip to funky town',
    author: 'Tom Coleman',
}, {
    title: 'The Meteor Book',
    baseline : 'Defenitely something worse looking into!',
    author: 'Tom Coleman',
} ];
Template.projectsList.helpers({
  projects: projectsData
});