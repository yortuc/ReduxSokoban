import React, { Component } from 'react';  

class Sprite extends Component {  

    constructor() {
        super();
    }

    render() { 
    	var ctx = this.props.ctx;
		ctx.fillStyle= this.props.color || "#FF0000";
		ctx.fillRect(this.props.x,this.props.y,50,50);

    	return null;
    }
}

export default Sprite;