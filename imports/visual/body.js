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



console.log('UserID: ' + Meteor.userId());


//////////////////////////////
// SELECTING IMAGES from COLLECTION 
//////////////////////////////

Template.body.helpers({
    images() { // images connects to {{#each images}}
        if (Session.get('category') === 'dogs') {
            console.log('Session set & get successful');
            return Allimages.find({ image_category: 'dogs' }, { sort: { image_rating: -1 } });

        }
        if (Session.get('category') === 'cats') {
            console.log('Session set & get successful');
            return Allimages.find({ image_category: 'cats' }, { sort: { image_rating: -1 } });

        }
        if (Session.get('category') === 'lamas') {
            return Allimages.find({ image_category: 'lamas' }, { sort: { image_rating: -1 } });
        }

        if (Session.get('category') === 'rabbits') {
            return Allimages.find({ image_category: 'rabbits' }, { sort: { image_rating: -1 } });
        }
        if (Session.get('category') === 'birds') {
            return Allimages.find({ image_category: 'birds' }, { sort: { image_rating: -1 } });
        }
        if (Session.get('category') === 'more') {
            return Allimages.find({ image_category: 'more' }, { sort: { image_rating: -1 } });
        }
        if (Session.get('category') === 'all') {
            return Allimages.find({}, { sort: { image_rating: -1 } });
        }

        return Allimages.find({}, { sort: { image_rating: -1 } });

    },
});



Template.body.events({

    'click .dogs' () {
        console.log('dogs clicked');
        Session.set('category', 'dogs');
    },
    'click .cats' () {
        Session.set('category', 'cats');
    },

    'click .lamas' () {
        Session.set('category', 'lamas');
    },
    'click .rabbits' () {
        Session.set('category', 'rabbits');
    },
    'click .birds' () {
        Session.set('category', 'birds');
    },
    'click .more' () {
        Session.set('category', 'more');
    },
    'click .all' () {
        Session.set('category', 'all');
    },
    'click .upvote' () {
        console.log('upvoted');
        // var currentitem = Allimages.find({ _id: this._id })
        // console.log(currentitem)
        Allimages.update(this._id, { $set: { image_rating: this.image_rating + 1 } })

    },
    'click .downvote' () {
        console.log('downvoted');
        // var currentitem = Allimages.find({ _id: this._id })
        // console.log(currentitem)
        Allimages.update(this._id, { $set: { image_rating: this.image_rating - 1 } })

    },

});