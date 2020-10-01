import React, { Component } from 'react';
import Button from '../../component/button/Button';

export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
        this.param = this.props.match;
    }
    render() {
        console.log(this.param);
        return (
            <React.Fragment>
                <h1>Welcome Home !</h1>
                <p>Welcome to my website ! You will find some of my works during the past 3 years of coding</p>
                <h2>Who am i ?</h2>
                <p>
                    Hello my name is Benoit Lamonica, I'm a web developper since 3 years. I love my job because it change permanently, you can't always do the same thing when you code. 
                    Actually i work in the wine field, that's a really cool experience
                </p>
                <Button href="/svg">SVG</Button>
                <Button href="/games">Games</Button>
            </React.Fragment>
        )
    }
}