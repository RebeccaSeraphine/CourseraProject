import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check'; //unused, but needed in case you want to check the input

export const Allimages = new Mongo.Collection('allimages');


//////////////////////////////
// Methods (required after isecure package is removed)
//////////////////////////////

Meteor.methods({
    // Inserting Images --> all const defined in the form in addimages.js are put in as parameters here 
    'allimages.insert' (image_title, image_source, image_alt, image_category, image_rating) {
        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        Allimages.insert({ // With insecure, this was previously done directly in addimages.js in the Template.events
            image_title,
            image_source,
            image_alt,
            createdAt: new Date(),
            image_rating,
            image_category,
        });
    },

    // Deleting Images
    'allimages.remove' (removethis) {
        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }
        Allimages.remove(removethis); // With insecure, this was previously done directly in addimages.js in the Template.events
    },
    // Update Image Rating

    'allimages.upvote' (upvotethis, image_newrating) {
        if (!Meteor.userId()) {
            alert('Please sign in');
        }
        console.log('upvoted');
        Allimages.update(upvotethis, { $set: { image_rating: image_newrating } });

    },

    'allimages.downvote' (downvotethis, image_newrating) {
        if (!Meteor.userId()) {
            alert('Please sign in');
        }
        Allimages.update(downvotethis, { $set: { image_rating: image_newrating } });
        console.log('downvoted');
    },
});

//////////////////////////////
// Publication (required after autopublish package is removed)
//////////////////////////////

if (Meteor.isServer) {
    Meteor.publish('allimages', function imagesPublication() {
        return Allimages.find();
    });
}