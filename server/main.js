import { Meteor } from 'meteor/meteor';
import {WebApp} from 'meteor/webapp';


import '../imports/api/users';
import {Links} from '../imports/api/links';

Meteor.startup(() => {
  // code to run on server at startup
  WebApp.connectHandlers.use((req, res, next)=>{//use is used to call middleware
                                                //each time we want to use middleware, we calll 
    const _id = req.url.slice(1);
    const link = Links.findOne({_id});

    if(link){
      const timeStamp = Math.floor(Date.now() / 1000);
      Links.update({_id: link._id}, {$set:{visitedCount: link.visitedCount+1, lastVisitedAt: timeStamp}});
      res.statusCode = 302;
      res.setHeader('Location', link.url);
      res.end();
    }else{
      next();
    }
  });

});
