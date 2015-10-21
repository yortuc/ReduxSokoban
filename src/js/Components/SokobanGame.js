import React, { Component } from 'react';  
import Rectangle from './Rectangle';  
import Game from './Game';  

class SokobanGame extends Component {  

    constructor() { 
        super();
    }

    createMap() {
        var height, width = -1;
        var rows = this.props.level;
        var level_id = this.props.id;

        var tiles = [];
        var ind = 0;
        var foundWall = false;

        for(let i=0; i<rows.length; i++){
            let row = rows[i];

            for(let j=0; j<row.length; j++){
                if(row[j]==="#") foundWall = true;
                if(foundWall) 
                    tiles.push(<Rectangle key={level_id + '_' + (++ind)} x={j*50} y={i*50} type={row[j]} />);
            } 

            if(row.length > width) width = row.length;
            foundWall = false;
        }

        return {
            tiles: tiles,
            width: width * 50,
            height: rows.length * 50
        };
    }

    handleUndo () {
        this.props.dispatch({type: 'UNDO'});
    }

    componentDidUpdate (){
        // check if level is completed
        var freeBoxCount = this.props.level.reduce((prevRow, currRow)=> {
            return prevRow + currRow.reduce((prevCell, currCell) => {
                                        return prevCell + (currCell === "$" ? 1 : 0);
                                     }, 0);
        }, 0);

        if(freeBoxCount===0){
            this.props.dispatch({type: 'NEXT_LEVEL'});
        }
    }

    render() { 
        var map = this.createMap();

    	return (
            <div>
        		<Game width={map.width} height={map.height}>
                    { map.tiles }
                </Game>
                <div className="buttonHolder"> 
                    <button onClick={this.handleUndo.bind(this)}>Undo</button>
                </div>
            </div>
    	)
    } 
}

export default SokobanGame;