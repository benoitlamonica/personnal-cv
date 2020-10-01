import React, { Component } from 'react';
import './svg.scss';
export default class SVG extends Component {

    render() {
        return (
            <React.Fragment>
                <h1>SVG tester</h1>
                <p>Coucou</p>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
                    <rect x="50" y="50" />
                    <path
                        stroke="white"
                        fill="none"
                        d="
                        M 100, 70,
                        c   -60, -80
                            0, 100
                            0, 100
                        "
                    />
                </svg>
            </React.Fragment>
        )
    }
}