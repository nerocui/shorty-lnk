import React, { Component } from 'react';
import {Meteor} from 'meteor/meteor';
import Clipboard from 'clipboard';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';

export default class LinksListItem extends Component {

    constructor(props){
        super(props);
        this.state = {copy:'Copy'};
    }
    componentDidMount(){
        this.clipboard = new Clipboard(this.refs.copy);
        this.clipboard.on('success', ()=>{
            this.setState({copy:'Copied'});
            setTimeout(()=>{
                this.setState({copy:'Copy'});
            }, 500);
        }).on('error', ()=>{

        });
    }

    componentWillUnmount(){
        this.clipboard.destroy();
    }

    onClick(e){
        location.href = Meteor.absoluteUrl(this.props._id);
    }

    hideElement(e){
        const link = {
            url: this.props.url,
            user: this.props.user,
            _id: this.props._id,
            hidden: !this.props.hidden
        };
        Meteor.call('links.update',link, (err, res)=>{
            if(err){
                console.log('Error from update:', err.reason);
            }
            console.log('Response from update: ', res);
        });
    }

    onCopy(e){

    }

    render() {
        const sl = Meteor.absoluteUrl(this.props._id);
        var dateformat = "";
        if(this.props.lastVisitedAt){
            const d = new Date(this.props.lastVisitedAt*1000);
            const year = d.getFullYear();
            const month = d.getMonth();
            const day = d.getDate();
            const hour = d.getHours();
            const min = d.getMinutes();

            dateformat = "Last visited at: " + month + "/" + day + "/" + year + "-" + hour + ":" + min;
            
        }else{
            dateformat = "Never visited";
        }
        const date = this.props.lastVisitedAt?("Last visited at: " + new Date(this.props.lastVisitedAt*1000)):"Never visited";
        return (
            <div className="list-item" >
                
                <div className="link" >{this.props.url}</div>
                <div className="shortened-link" >Shortened link: {sl}</div>
                <button className="button" onClick={this.onClick.bind(this)} >Visit</button>
                <button className="button" ref="copy" data-clipboard-text={sl} >{this.state.copy}</button>
                <button className="button" onClick={this.hideElement.bind(this)}>{this.props.hidden?'Unhide':'Hide'}</button>
                <div className="chip">{"Visited " + this.props.visitedCount + " times"}</div>
                <div className="chip">{dateformat}</div>
            </div>
            
        );
    }
}