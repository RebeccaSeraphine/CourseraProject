import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Allimages } from '../logic/imagecollection.js';
import './body.html';
import './addimages.html';


var user = Meteor.userId()
console.log('User ' + user);


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



/*

Template.registerHelper('equals',
    function(v1, v2) {
        return (v1 === v2);
    }
);

Template.addimages.helpers({
admincheck(){
    if (user==='FpcJTpE5EjfDNqm49')
}
})


images() { // images connects to {{#each images}}
        if (Session.get('category') === 'dogs') {
            console.log('Session set & get successful');
            return Allimages.find({ image_category: 'dogs' }, { sort: { createdAt: -1 } });

        }
*/
//////////////////////////////
// ADDING IMAGES TO COLLECTION 
//////////////////////////////


Template.addimages.events({
    'submit .newimage' (event) {
        console.log('image submit event');
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