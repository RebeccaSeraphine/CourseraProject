import { Template } from 'meteor/templating';
import { Allimages } from '../logic/imagecollection.js';
import './body.html';
import './addimages.html';


//////////////////////////////
// ADDING IMAGES TO COLLECTION 
//////////////////////////////

Template.addimages.events({
    'submit .newimage' (event) {
        console.log('test image submit event');
        event.preventDefault();

        const target = event.target;
        const image_title = target.image_title.value;
        const image_source = target.image_source.value;
        const image_alt = target.image_alt.value;
        const image_category = target.image_category.value;


        Allimages.insert({
            image_title,
            image_source,
            image_alt,
            createdAt: new Date(),
            image_rating: 0,
            image_category,
        });

        // Clear the form
        target.image_title.value = '';
        target.image_source.value = '';
        target.image_alt.value = '';
        target.image_category.value = '';
    },
});


//////////////////////////////
// Deleting IMAGES from COLLECTION 
//////////////////////////////

Template.deleteimage.events({
    'click .delete' () {
        Allimages.remove(this._id);
    },
});