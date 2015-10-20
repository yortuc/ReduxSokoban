import React, { Component } from 'react';  
import resources from '../resourceLoader';

class Rectangle extends Component {  

    shouldComponentUpdate (nextProps, nextState){
        // update only if type prop is changed
        return this.props.type != nextProps.type;
    }

    clearSelf (){
        // clear the rectangle on canvas
        this.props.ctx.clearRect(this.props.x,this.props.y,50,50);
    }

    drawImage(imageLabel) {
        var size = 50;
        this.props.ctx.drawImage(resources.images[imageLabel], this.props.x, this.props.y, size, size);
    }

    componentWillUnmount(){
        this.clearSelf();
    }

    render() { 

        this.clearSelf();

        switch(this.props.type) {
        case "$" :
            this.drawImage("box");
            break

        case "#" :
            this.drawImage("wall");
            break;

        case "*":
            this.drawImage("box_done")
            break;

        case "." :
            this.drawImage("pad");
            break;

        case "@" :  
            this.props.ctx.fillStyle = "#eee";
            this.props.ctx.fillRect(this.props.x, this.props.y, 50,50);
            this.drawImage("player");
            break;

        case " ":
            this.props.ctx.fillStyle = "#eee";
            this.props.ctx.fillRect(this.props.x, this.props.y, 50,50);
            break;

        case "+":
            this.drawImage("pad");
            this.drawImage("player");
        }
        
    	return null;
    }
}

export default Rectangle;