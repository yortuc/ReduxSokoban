import React, { Component } from 'react';  
import Box from './Box';  
import Game from './Game';  
import Sprite from './Sprite';  

class SokobanGame extends Component {  

    constructor() { 
        super();
    }

    createMap(){
        var level = this.props.level.replace(/\,/gi, '').split('\n').map(s=> {
            return s.replace(/\s/gi, '')
        });

        var tiles = [];
        var bgcolor = ["#fff", "#e5e5e5"];
        var color = [null, "black", "green", "yellow", "blue"];
        var ind = 0;

        for(var i=0; i<level.length; i++){
            var satir = level[i];

            for(var j=0; j<satir.length; j++){
                var renk = satir[j] === "0" ? bgcolor[(i+j)%2] : color[satir[j]];

                tiles.push(
                    <Box key={++ind} x={j*50} y={i*50} color={renk} />
                );
            } 
        }

        return tiles;
    }

    handleUndo () {
        this.props.dispatch({type: 'UNDO'});
    }

    render() { 
        console.log("game render", this.props.canUndo);
        this.createMap();
    	return (
            <div>
        		<Game>
                    {this.createMap()}
                    <Sprite color="red" x={this.props.playerX*50} y={this.props.playerY*50}/>
                </Game>
                <button onClick={this.handleUndo.bind(this)}>
                    Geri Al
                </button>
            </div>
    	)
    } 
}

export default SokobanGame;