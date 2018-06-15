import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

export const Links = new Mongo.Collection('links');

if(Meteor.isServer){
    Meteor.publish('linksPub', function(){
        const userId = this.userId;
        console.log('user id from links api: ', userId);
        return Links.find({user: userId});
    });
}

Meteor.methods({
    'links.insert'(link){
        //check is link object is valid
        //  1. url is a valid url
        //  2. has a userId that are in the user collection
        //otherwise, we throw a Meteor error
        if(!this.userId){
            throw new Meteor.Error('not-authorized');
        }
        try{
            new SimpleSchema({
                url:{
                    type:String,
                    label:'Your link',
                    regEx: SimpleSchema.RegEx.Url
                },
                user:{
                    type:String
                },
                _id:{
                    type:String
                },
                hidden:{
                    type:Boolean
                },
                visitedCount:{
                    type:Number
                },
                lastVisitedAt:{
                    type:Object,
                    optional: true
                }
            }).validate(link);
            Links.insert(link);
            console.log('inserted ', link);
        }catch(e){
            throw new Meteor.Error(400, e.message);
        }

        return 'success';
    },
    'links.update'(link){
        if(!this.userId){
            throw new Meteor.Error('not-authorized');
        }
        try{
            new SimpleSchema({
                url:{
                    type:String,
                    label:'Your link',
                    regEx: SimpleSchema.RegEx.Url
                },
                user:{
                    type:String
                },
                _id:{
                    type:String
                },
                hidden:{
                    type:Boolean
                },
                visitedCount:{
                    type:Number,
                    optional: true
                },
                lastVisitedAt:{
                    type:Object,
                    optional: true
                }
            }).validate(link);
            Links.update({_id:link._id}, {$set:{hidden:link.hidden}});
            console.log('Updated ', Links.find({_id:link._id}).fetch());
        }catch(e){
            throw new Meteor.Error(400, e.message);
        }

        return 'success';
    }
});