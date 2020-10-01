import React, { Component } from 'react';

export default class Error404 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            paramEntered : 'test'
        }
        this.routeParam = this.props;
    }
    
    render() {
        let param = this.routeParam.match.params;
        console.log(param[0]);
        console.log(this.routeParam);
        return (
            <i>404, you tape {param[0]}</i>
        )
    }
}