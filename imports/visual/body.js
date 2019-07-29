import { Template } from 'meteor/templating';
import { Allimages } from '../logic/imagecollection.js';
import './body.html';

Template.body.helpers({
    images() { // images connects to {{#each images}}
        return Allimages.find({});
    },
});

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
            image_alt
        });
    }
});