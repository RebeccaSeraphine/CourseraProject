import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Session } from 'meteor/session'
import { Allimages } from '../logic/imagecollection.js';
import './body.html';
import './addimages.html';


// Creating a Reactive Dictionary to store the temporary UI state
Template.body.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict();
});


Template.body.helpers({
    images() { // images connects to {{#each images}}
        if (Session.get('category') === 'dogs') {
            console.log('Session set & get successful');
            return Allimages.find({ image_category: 'dogs' }, { sort: { createdAt: -1 } });

        }
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
    },
});


//////////////////////////////
// Deleting IMAGES from COLLECTION 
//////////////////////////////


Template.body.events({
    'click .delete' () {
        Allimages.remove(this._id);
    },

    //////////////////////////////
    // SELECTING IMAGES from COLLECTION 
    //////////////////////////////


    'click .dogs' () {
        console.log('dogs clicked');
        Session.set('category', 'dogs');
    },
});