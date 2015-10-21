import React, { Component } from 'react/addons';  

class Game extends Component {  

    constructor() {
        super();

        this.state = {
            ctx: null
        }
    }

    componentDidMount(){
        var c = document.getElementById("game");
        var ctx = c.getContext("2d");

        this.setState({
            ctx: ctx
        });
    }

    mapChildren (){
        var ind=0;
        return React.Children.map(this.props.children, function (child) {
            return React.addons.cloneWithProps(child, {
                        name: this.props.name,
                        ctx: this.state.ctx
                    });
        }.bind(this));
    }

    render() {
        var style={
            marginLeft: -Math.floor(this.props.width/2),
            marginTop: -Math.floor(this.props.height/2)
        };

    	return (
    		<canvas id="game" width={this.props.width} height={this.props.height} style={style}>
                { this.state.ctx ? this.mapChildren() : []}
            </canvas>
    	)
    }
}

export default Game;