import React, { Component } from 'react';
import "./header.scss";

export default class Header extends Component {
    render() {
        return (
            <header>
                <span className="logo">
                    Benoit Lamonica
                </span>
                <nav>
                    <a href="/">home</a>
                    <a href="/button">button</a>
                </nav>
            </header>
        )
    }
}