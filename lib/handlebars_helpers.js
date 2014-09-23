

Handlebars.registerHelper('projectCount', function () {
    pro = Projects.find().count();
    return pro;
});
