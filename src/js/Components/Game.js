import React, { Component } from 'react/addons';  

class Game extends Component {  

    constructor() {
        super();

        // Default state.
        this.state = {
            tick: 0,
            ctx: null
        }
    }

    componentDidMount(){
        var c = document.getElementById("game");
        var ctx = c.getContext("2d");
        ctx.fillStyle = "#FF0000";

        this.setState({ctx: ctx});
    }

    mapChildren (){
        // henüz comp. mount olmadığı için context oluşmamış.
        // bu durumda child'ları render etme.
        if(!this.state.ctx) return null;

        this.state.ctx.clearRect(0, 0, 640, 480);

        return React.Children.map(this.props.children, function (child) {
                    return React.addons.cloneWithProps(child, {
                                name: this.props.name,
                                ctx: this.state.ctx 
                            })
                }.bind(this));
    }

    render() { 
        console.log("Game.render");
    	return (
    		<canvas id="game" width="900" height="600">
                {this.mapChildren()}
            </canvas>
    	)
    } 
}

export default Game;