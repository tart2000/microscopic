if (Projects.find().count() === 0) {

    Projects.insert({ 
        title: 'Telescope',
        baseline:'something awesome',
        author: 'Sacha Grief',
    }); 

    Projects.insert({ 
        title: 'Meteor',
        baseline : 'building awesome apps easily',
        author: 'Tom Coleman',
    }); 

    Projects.insert({ 
        title: 'PingPong',
        baseline : 'a one-way trip to funky town',
        author: 'Tom Coleman',
    }); 

    Projects.insert({ 
        title: 'The Meteor Book',
        baseline : 'Defenitely something worse looking into!',
        author: 'Tom Coleman',
    }); 


}
