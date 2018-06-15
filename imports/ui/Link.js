import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import LinksList from './LinksList';
import Header from './Header';
import AddLink from './AddLink';

class Link extends Component {
    render() {
        return (
            <div className="container container__bg">
                
                <Header title="Shorty Lnk"/>
                <div className="body-container" >
                    <LinksList/>
                </div>
            </div>
        );
    }
}

export default withRouter(Link);