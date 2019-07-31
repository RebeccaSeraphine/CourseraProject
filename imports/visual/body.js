import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Session } from 'meteor/session'
import { Allimages } from '../logic/imagecollection.js';
import './body.html';
import './addimages.html';



Template.body.onCreated(function bodyOnCreated() {
    // this.state = new ReactiveDict(); --> Creating a Reactive Dictionary to store the temporary UI state
    Meteor.subscribe('allimages'); // bubscription needed after autopublish package is removed
});


// console.log('UserID: ' + Meteor.userId());


//////////////////////////////
// Selecting images --> connects to animal category button clicks 
//////////////////////////////

Template.body.helpers({
    images() { // images connects to {{#each images}} in body.html
        // Sessions are set in Template.body.events below
        if (Session.get('category') === 'dogs') {
            console.log('Session set & get successful');
            return Allimages.find({ image_category: 'dogs' }, { sort: { createdAt: -1 } });

        }
        if (Session.get('category') === 'cats') {
            console.log('Session set & get successful');
            return Allimages.find({ image_category: 'cats' }, { sort: { createdAt: -1 } });

        }
        if (Session.get('category') === 'lamas') {
            return Allimages.find({ image_category: 'lamas' }, { sort: { createdAt: -1 } });
        }

        if (Session.get('category') === 'rabbits') {
            return Allimages.find({ image_category: 'rabbits' }, { sort: { createdAt: -1 } });
        }
        if (Session.get('category') === 'birds') {
            return Allimages.find({ image_category: 'birds' }, { sort: { createdAt: -1 } });
        }
        if (Session.get('category') === 'more') {
            return Allimages.find({ image_category: 'more' }, { sort: { createdAt: -1 } });
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


    // Voting Buttons Click Events

    'click .upvote' () {

        Session.set('votedup', 'yes'); // votedup & voteddown are remembered in the Session, to prevent users from voting up/down by more than 1 per session

        if (Session.get('votedup') === 'yes' && Session.get('voteddown') != 'yes') { //if user has not voted down before

            const upvotethis = this._id;
            const image_newrating = this.image_rating + 1;
            Meteor.call('allimages.upvote', upvotethis, image_newrating);
            /* With insecure, previous to method call:
            var currentitem = Allimages.find({ _id: this._id })
            Allimages.update(this._id, { $set: { image_rating: this.image_rating + 1 } }) */

            document.getElementById("upvotebutton").disabled = true; // Prevents voting up again
            document.getElementById("downvotebutton").disabled = false; // Allows voting down, so that user can "undo" the upvoting
            //console.log('upvoted case 1')

        } else if (Session.get('votedup') === 'yes' && Session.get('voteddown') === 'yes') { // if user has voted down before

            const upvotethis = this._id;
            const image_newrating = this.image_rating + 1;
            Meteor.call('allimages.upvote', upvotethis, image_newrating);

            Session.set('voteddown', 'no'); // "Reset" Session
            Session.set('votedup', 'no'); // "Reset" Session
            // console.log('upvoted case 2');

        }
    },

    'click .downvote' () {

        Session.set('voteddown', 'yes');

        if (Session.get('voteddown') === 'yes' && Session.get('votedup') != 'yes') {

            const downvotethis = this._id;
            const image_newrating = this.image_rating - 1;
            Meteor.call('allimages.downvote', downvotethis, image_newrating);

            document.getElementById("downvotebutton").disabled = true;
            document.getElementById("upvotebutton").disabled = false;
            //console.log('downvoted case 1');

        } else if (Session.get('voteddown') === 'yes' && Session.get('votedup') === 'yes') {

            const downvotethis = this._id;
            const image_newrating = this.image_rating - 1;
            Meteor.call('allimages.downvote', downvotethis, image_newrating);

            Session.set('voteddown', 'no');
            Session.set('votedup', 'no');
            //console.log('downvoted case 2');

        }

    },

});