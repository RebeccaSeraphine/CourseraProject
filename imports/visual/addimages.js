import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Allimages } from '../logic/imagecollection.js';
import './body.html';
import './addimages.html';


//var user = Meteor.userId()
//console.log('User ' + user);


// Enables the use of {{#if equals user admin}} {{> ...}} {{/if}} --> checking if logged in user has the admin user ID
Template.registerHelper('equals',
    function(user, admin) {
        var user = Meteor.userId()
        var admin = 'FpcJTpE5EjfDNqm49'
        if (user === admin) {
            return (user === admin)
        };
        return (user == !admin);
    }
);



//////////////////////////////
// ADDING IMAGES TO COLLECTION --> available to admin user only
//////////////////////////////


Template.addimages.events({
    'submit .newimage' (event) {
        // console.log('image submit event');
        event.preventDefault();

        const target = event.target;
        const image_title = target.image_title.value;
        const image_source = target.image_source.value;
        const image_alt = target.image_alt.value;
        const image_category = target.image_category.value;
        const image_rating = 0;

        Meteor.call('allimages.insert', image_title, image_source, image_alt, image_category, image_rating);

        //With insecure, previous to method call
        /* Allimages.insert({        
             image_title,
             image_source,
             image_alt,
             createdAt: new Date(),
             image_rating: 0,
             image_category,
         }); */

        // Clear the form
        target.image_title.value = '';
        target.image_source.value = '';
        target.image_alt.value = '';
        target.image_category.value = '';
    },
});


//////////////////////////////
// Deleting IMAGES from COLLECTION --> available to admin user only
//////////////////////////////


Template.deleteimage.events({
    'click .delete' () {
        const removethis = this._id; // sending this._id as parameter to the method as const removethis
        Meteor.call('allimages.remove', removethis);

        //With insecure, previous to method call
        /* Allimages.remove(this._id); */
    },
});