import React, {Component} from 'react';
import Header from "../header/header";

export default class Template extends Component{
    render() {
        return (
            <main>
                <Header/>
                {this.props.children}
            </main>
        )
    }
}