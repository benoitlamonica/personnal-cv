import './Button.scss';
import React from 'react';
import { Component } from 'react';

export default class Button extends Component {

    constructor(props) {
        super(props)
        this.handler = this.props.handler == null ? ()=>{} : this.props.handler;
        this.state = {
            visible : this.props.visible === undefined ? true : this.props.visible
        }
        
    }

    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.visible !== prevState.visible){

            console.log('coucou');
            return { 
                visible: nextProps.visible === undefined ? true : nextProps.visible
            };
        }
        else return null;
    }

    render() {
        return (
            <a onClick={this.handler} href={this.props.href} className="button" style={ this.state.visible ? {display : "block"} : {display : "none"} }>
                {this.props.children}
            </a>
        )
    }
}