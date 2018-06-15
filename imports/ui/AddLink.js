import React, { Component } from 'react';
import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';
import shortid from 'shortid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default class AddLink extends Component {
    constructor(props){
        super(props);

        this.state = {error: '', url: ''};
    }


    onSubmit(e){
        e.preventDefault();
        this.setState({url:''});
        const url = this.state.url.trim();
        if(url){
            Meteor.call(
                'links.insert', 
                {   url, user:Accounts.userId(), 
                    _id:shortid.generate(), 
                    hidden:false, 
                    visitedCount: 0, 
                    lastVisitedAt: null}, 
                (err,res)=>{
                    if(err){
                        console.log('Error: ', err.reason);
                        this.setState({error:err?err.reason:''});
                    }
                    console.log(res);
                }
            );
            this.state.url.value = '';
        }
    }

    onChange(e){
        e.preventDefault();
        this.setState({url: e.target.value});
        this.setState({error:''});
    }
    
    render() {
        return (
            <div className="add-item">
                <p>{this.state.error}</p>
                <form   onSubmit={this.onSubmit.bind(this)}>
                    <input      type="text" 
                                placeholder="URL" 
                                value={this.state.url} 
                                onChange={this.onChange.bind(this)} />
                    <button     className="add-item__button"
                                type="submit">
                        Add
                    </button>
                </form>
            </div>
        );
    }
}

