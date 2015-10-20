import React, { Component } from 'react';  

class Sprite extends Component {  

    constructor() {
        super();
    }

    render() { 
    	var ctx = this.props.ctx;
		ctx.beginPath();
		ctx.arc(this.props.x+25, this.props.y+25, 25, 0, 2 * Math.PI, false);
		ctx.fillStyle= this.props.color || "#FF0000";
		ctx.fill();

    	return null;
    }
}

export default Sprite;