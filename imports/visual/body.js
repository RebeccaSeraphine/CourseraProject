import { Template } from 'meteor/templating';
import { Allimages } from '../logic/imagecollection.js';
import './body.html';
import './addimages.html';

Template.body.helpers({
    images() { // images connects to {{#each images}}
        return Allimages.find({}, { sort: { createdAt: -1 } });
    },
});


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


        Allimages.insert({
            image_title,
            image_source,
            image_alt,
            createdAt: new Date(),
            image_rating: 0,
        });

        // Clear the form
        target.image_title.value = '';
        target.image_source.value = '';
        target.image_alt.value = '';
    },
});

Template.body.events({
    'click .delete' () {
        Allimages.remove(this._id);
    }
})