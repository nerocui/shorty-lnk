import React, { Component } from 'react';
import {Accounts} from 'meteor/accounts-base';
import Button from '@material-ui/core/Button';
import AddLink from './AddLink';

export default class Header extends Component {

    onLogout(){
        Accounts.logout();
    }


    render() {
        return (
            <div className="header" >
                <h1>{this.props.title}</h1>
                <AddLink title="Add Link"/>
                <button className="button right button__logout" onClick={this.onLogout.bind(this)} >Logout</button>
            </div>
        );
    }
}
