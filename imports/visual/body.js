import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Session } from 'meteor/session'
import { Allimages } from '../logic/imagecollection.js';
import './body.html';
import './addimages.html';


// Creating a Reactive Dictionary to store the temporary UI state
Template.body.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict();
    Meteor.subscribe('allimages'); // needed after autopublish package is removed
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

Template.votingbuttons.helpers({
    buttons() {
        if (Session.get('votedup' === 'yes')) {
            document.getElementById("upvotebutton").disabled = true;
        }
        console.log('button helper here');
    }
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

        Session.set('votedup', 'yes');


        if (Session.get('votedup') === 'yes' && Session.get('voteddown') != 'yes') {
            console.log('upvoted case 0')
            const upvotethis = this._id; //this._id not working in method direktly --> give in as parameter
            const image_newrating = this.image_rating + 1; //needed as method parameter
            // var currentitem = Allimages.find({ _id: this._id })
            // console.log(currentitem)
            // Allimages.update(this._id, { $set: { image_rating: this.image_rating + 1 } }) --> With insecure, previous to method call
            Meteor.call('allimages.upvote', upvotethis, image_newrating);

            document.getElementById("upvotebutton").disabled = true;
            document.getElementById("downvotebutton").disabled = false;
            console.log('upvoted case 1')


        } else if (Session.get('votedup') === 'yes' && Session.get('voteddown') === 'yes') {

            const upvotethis = this._id; //this._id not working in method direktly --> give in as parameter
            const image_newrating = this.image_rating + 1; //needed as method parameter
            Meteor.call('allimages.upvote', upvotethis, image_newrating);

            Session.set('voteddown', 'no');
            Session.set('votedup', 'no');
            console.log('upvoted case 2');

        }
    },

    'click .downvote' () {

        Session.set('voteddown', 'yes');

        if (Session.get('voteddown') === 'yes' && Session.get('votedup') != 'yes') {

            const downvotethis = this._id;
            const image_newrating = this.image_rating - 1;
            // var currentitem = Allimages.find({ _id: this._id })
            // console.log(currentitem)
            // Allimages.update(this._id, { $set: { image_rating: this.image_rating - 1 } }) --> With insecure, previous to method call
            Meteor.call('allimages.downvote', downvotethis, image_newrating);
            document.getElementById("downvotebutton").disabled = true;
            document.getElementById("upvotebutton").disabled = false;
            console.log('downvoted case 1');

        } else if (Session.get('voteddown') === 'yes' && Session.get('votedup') === 'yes') {

            const downvotethis = this._id;
            const image_newrating = this.image_rating - 1;
            Meteor.call('allimages.downvote', downvotethis, image_newrating);


            Session.set('voteddown', 'no');
            Session.set('votedup', 'no');
            console.log('downvoted case 2');

        }

    },

});