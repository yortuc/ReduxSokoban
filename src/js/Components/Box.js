import React, { Component } from 'react';  

class Box extends Component {  

    constructor() {
        super();
        this.state = {
        }
    }

    render() { 
    	var ctx = this.props.ctx;

		ctx.fillStyle= this.props.color || "#FF0000";
		ctx.fillRect(this.props.x,this.props.y,this.props.width||50,this.props.height||50);

    	return null;
    }
}

export default Box;