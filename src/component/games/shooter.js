import React, { Component } from 'react';
import './shooter.scss';
import Button from '../button/Button';

export default class ShooterGame extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isGameStarted : false,
            firePos : {
                18 : [9],
                19 : [8,9,10]
            },
            lastFirePos : false,
            gameOver : false,
            nbProjectile : 0,
            nbFire : 0,
            nbCol : 0,
            divCol : '',
            difficulty : 500,
            score : 0

        }
    }

    createDivs = () => {

        let divs = [];
        for (let i = 0; i < 400; i++) {
            divs.push(<div className="block" key={i}></div>);
        }
        return divs;
    }

    startGame = () => {
        document.addEventListener('keydown', (e) => {
            this.handleFireControl(e);
        });

        this.setState({
            isGameStarted : true,
            gameOver : false,
        }, () => {
            console.log("Start !!");
            let allDivs = document.querySelectorAll('.shooter-container > div');
            let objDiv = [];
            let objToPush = [];
            let ligns = 1;
            for (let i = 0; i < allDivs.length; i++) {
                if(ligns < 20) {
                    const div = allDivs[i];
                    objToPush.push(div);
                    ligns++;
                } else {
                    const div = allDivs[i];
                    objToPush.push(div);
                    objDiv.push(objToPush);
                    objToPush = [];
                    ligns = 1;
                }
            }
            console.log(objDiv);
            this.setState({
                theDivs : objDiv
            }, () => {
                this.colorFire();
                this.generateThreat();
            })
        })
        
    }

    handleFireControl = (e) => {
        console.log(e.keyCode);
        let code = e.keyCode;
        if(code === 37) {

            this.turn('left');

        } else if(code === 39) {

            this.turn('right')

        } else if(code === 32) {

            this.fire();

        }
    }

    colorFire = () => {

        if(this.state.lastFirePos) {
            for( let line in this.state.lastFirePos) {
                let arrCol = this.state.lastFirePos[line];
                arrCol.forEach(col => {
                    this.state.theDivs[line][col].style.backgroundColor = "#f0f0f0";
                })
            }
        }

        for( let line in this.state.firePos) {
            let arrCol = this.state.firePos[line];
            arrCol.forEach(col => {
                this.state.theDivs[line][col].style.backgroundColor = "red";
            })
        }
    }

    turn = (direction) => {

        if(direction === 'left') {
            let newFirePos = {};
            for(let line in this.state.firePos) {

                newFirePos = {
                    ...newFirePos,
                    [line] : []
                };
                
                this.state.firePos[line].forEach(col => {
                    
                    newFirePos[line].push(col-1);

                });
            }
            

            this.setState({

                firePos : newFirePos,
                lastFirePos : this.state.firePos

            }, () => {
                this.colorFire();
            });

        } else if(direction === 'right') {

            let newFirePos = {};
            for(let line in this.state.firePos) {

                newFirePos = {
                    ...newFirePos,
                    [line] : []
                };
                
                this.state.firePos[line].forEach(col => {
                    
                    newFirePos[line].push(col+1);

                });
            }

            this.setState({

                firePos : newFirePos,
                lastFirePos : this.state.firePos

            }, () => {
                this.colorFire();
            });

        }
    }

    fire = () => {

        let nbFire = this.state.nbFire;
        let nbProj = this.state.nbProjectile;

        this.setState({
            nbFire : nbFire + 1,
            nbProjectile : nbProj + 1
        },() => {

            let colToShoot = this.state.firePos[18][0];
            let lineProjectile = 17;
            let divToShoot = false;
            
            let intervalShoot = setInterval(() => {

                if(lineProjectile === -1) {

                    nbProj = this.state.nbProjectile;

                    this.setState({

                        nbProjectile : nbProj - 1

                    }, () => {

                        clearInterval(intervalShoot);
                        divToShoot.classList.remove('fire');
                        
                    })
                    return;
                    
                }

                if(lineProjectile != 17) {
                    divToShoot.classList.remove('fire');
                }

                divToShoot = this.state.theDivs[lineProjectile][colToShoot];
                divToShoot.classList.add('fire');

                if(this.handleCollision(divToShoot)) {
                    console.log('====================================');
                    console.log("COLLISION !!!!");
                    console.log('====================================');
                    nbProj = this.state.nbProjectile;

                    this.setState({

                        nbProjectile : nbProj - 1

                    }, () => {

                        clearInterval(intervalShoot);
                        this.setState({
                            nbCol : this.state.nbCol + 1,
                            divCol : divToShoot
                        })
                        
                    })

                    return;
                }

                console.log('====================================');
                console.log(divToShoot);
                console.log('====================================');

                lineProjectile--;

            },25);
        });


    }

    generateThreat = () => {
        let nbGenerated = 0;
        let intervalThreat = setInterval(() => {

            if (this.state.gameOver) {
                clearInterval(intervalThreat);
                return;
            }
            if(nbGenerated === 5) {
                this.setState({
                    difficulty : this.state.difficulty - 50
                })
                nbGenerated = 0;
            }


            let threatDivNum = Math.floor(Math.random() * 18 + 1);
            let threatDiv = this.state.theDivs[0][threatDivNum];
            console.log(threatDiv);
            this.animateTreatDiv(threatDiv, threatDivNum);
            nbGenerated++;
        }, 2000);
    }

    animateTreatDiv = (div, col) => {

        let line = 1;
        let divThreat = div;
        div.classList.add("threat");

        let animatedThreatInterval = setInterval(() => {

            if(this.state.nbCol === 2) {
                this.state.divCol.setAttribute('class', "block");
                this.setState({
                    nbCol : 0,
                    score : this.state.score + 1
                });
            }
            
            let ancientDiv = divThreat;

            if(this.handleCollision(divThreat)) {

                console.log('====================================');
                console.log("COLLISION GREEN");
                console.log('====================================');

                this.setState({
                    nbCol : this.state.nbCol + 1,
                    divCol : divThreat
                })

                clearInterval(animatedThreatInterval);
                return;
            }

            if (this.state.gameOver) {
                ancientDiv.classList.remove('threat');
                clearInterval(animatedThreatInterval);
                return;
            }

            if(line === 20) {
                ancientDiv.classList.remove('threat');
                clearInterval(animatedThreatInterval);
                this.gameOver();
                return;
            }

            let newDiv = this.state.theDivs[line][col];
            divThreat = newDiv;

            ancientDiv.classList.remove("threat");
            newDiv.classList.add("threat");

            line++;

        }, this.state.difficulty)
    }

    handleCollision = (div) => {

        let getClass = typeof div === "object" ? div.getAttribute('class') : false;

        console.log('====================================');
        console.log(getClass);
        console.log('====================================');

        if(getClass) {

            if(getClass === "block threat fire" || getClass === "block fire threat") {

                return true;

            } else {

                return false;

            }

        } else {

            return false;

        }
        
    }
        
    gameOver = () => {

        this.setState({
            gameOver : true,
            isGameStarted : false,
            firePos : {
                18 : [9],
                19 : [8,9,10]
            },
            lastFirePos : false
        });
    }

    showGOMessage = () => {
        if(this.state.gameOver) {
            return (
                <div className="game-over">
                    Game over
                </div>
            )
        }
    }

    render() {
        console.log('====================================');
        console.log(this.state.nbCol);
        console.log(this.state.divCol);
        console.log('====================================');
        return (
            <div className="game-container">
                <div className="shooter-container">
                    {this.state.gameOver ? '' : this.createDivs()}
                    {this.showGOMessage()}
                </div>
                <Button visible={!this.state.isGameStarted} handler={this.startGame}>Start</Button>
                <p>Score : {this.state.score}</p>
            </div>
        )
    }
}