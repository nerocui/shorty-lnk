import React, { Component } from 'react';
import {Tracker} from 'meteor/tracker';
import {Links} from '../api/links';
import {Meteor} from 'meteor/meteor';
import LinksListItem from './LinksListItem';
import Switch from '@material-ui/core/Switch';
import FlipMove from 'react-flip-move';

export default class LinksList extends Component {

    constructor(props){
        super(props);
        this.state={
            links: [],
            hiddenLinks:[],
            showHidden:false
        };
    }


    componentDidMount(){
        console.log('component did mount link list');
        this.linksTracker = Tracker.autorun(
            ()=>{
                Meteor.subscribe('linksPub');
                const links = Links.find({hidden:false}).fetch();
                this.setState({links});
                const hiddenLinks = Links.find({hidden:true}).fetch();
                this.setState({hiddenLinks});
              
            }
          );
          
    }

    componentWillUnmount(){
        console.log('component will unmount link list');
        this.linksTracker.stop();
    }

    renderLinksListItems(){
        var links = this.state.links;
        if(this.state.showHidden){
            links = this.state.hiddenLinks;
        }
        return (
            <FlipMove>
                {links.map((link)=>{
                    return (
                        <LinksListItem key={link._id} {...link} />
                    );
                })}
            </FlipMove>
        );
    }

    onCheck(e){
        this.setState({showHidden:e.target.checked});
    }

    render() {
        return (
            <div className="link-list" >
                <span className="toggle" >Toggle hidden links<Switch type="checkbox" onClick={this.onCheck.bind(this)}/></span>
                <div className="list-container">{this.renderLinksListItems()}</div>
            </div>        
        );
    }
}