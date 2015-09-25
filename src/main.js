import React from 'react';  
import SokobanGame from './js/Components/GameContainer'; 
import { createStore } from 'redux';
import { Provider } from 'react-redux';



const initialState = {
	level: `1,1,1,1,1,1,1,1,1
			1,0,0,0,0,0,0,0,1
			1,0,0,0,3,0,0,0,1
			1,0,0,0,1,0,0,0,1
			1,0,0,1,1,1,2,0,1
			1,0,2,0,1,0,0,0,1
			1,0,0,0,3,0,0,0,1
			1,0,0,0,0,0,0,0,1
			1,1,1,1,1,1,1,1,1`,
	playerX: 1,
	playerY: 6
};

var appStates = [initialState];
var stateIndex = 0;

let store = createStore(reactSokoban, initialState);

function reactSokoban (state, action) {

	switch(action.type) {
	case 'UNDO': 
		return appStates.length>1 ? appStates[--stateIndex] : appStates[stateIndex];
		break;

	case 'PLAYER_MOVE_REQUEST':
		var nextState = tryToMove(state, action.dm);

		if(nextState !== state){
			pushState(nextState);
		}
	
		return nextState;
		break;

	default: 
		return state;
	}
};

function pushState(state){
	appStates = appStates.splice(0, stateIndex+1);
	appStates.push(state);
	stateIndex++;
}

function tryToMove(state, dm){

	var levelArr = state.level.replace(/\,/gi, '').split('\n').map(s=> {
        return s.replace(/\s/gi, '')
    });

	// oyuncunun gitmek istediği tile
	var finalX = state.playerX + (dm.dx || 0);	// immutable
	var finalY = state.playerY + (dm.dy || 0); 		// immutable
	var finalTile = levelArr[finalY][finalX];		// immutable

	// tile'ın gidilen yöne göre arkasında kalan tile
	var arkasi = {
		x: finalX + (dm.dx || 0), 
		y: finalY + (dm.dy || 0)
	};

	// hareket serbest 
	if( finalTile === "0" || finalTile === "3" || 
		( finalTile === "2" && levelArr[arkasi.y][arkasi.x] === "0" ) || 
		( finalTile === "2" && levelArr[arkasi.y][arkasi.x] === "3" ) ){

		// ittir
		if ( finalTile === "2" ){
			if(levelArr[arkasi.y][arkasi.x] === "0" || levelArr[arkasi.y][arkasi.x] === "3" ){
				var arkaSon = levelArr[arkasi.y][arkasi.x] === "3" ? "4" : "2";
				levelArr[arkasi.y] = updateRow(levelArr[arkasi.y], arkasi.x, arkaSon);
				levelArr[finalY] = updateRow(levelArr[finalY], finalX, "0");
			}
		}

		return Object.assign({}, state, {
			level : levelArr.join('\n'),
			playerX : finalX,
			playerY : finalY
		});
	}

	return state;
}

function updateRow(row, index, newValue){
	return row.substring(0,index) + newValue + row.substring(index+1, row.length);
}

React.render( <Provider store={store}>
			    {() => <SokobanGame />}
			  </Provider>, document.getElementById('content') );


window.addEventListener("keypress", (e)=>{
    switch(e.keyCode){
        case 97: 
            store.dispatch({ type: 'PLAYER_MOVE_REQUEST', dm: {dx: -1} });
            break;
        case 100:
            store.dispatch({ type: 'PLAYER_MOVE_REQUEST', dm: {dx: 1} });
            break;
        case 119:
            store.dispatch({ type: 'PLAYER_MOVE_REQUEST', dm: {dy: -1} });
            break;
        case 115:
            store.dispatch({ type: 'PLAYER_MOVE_REQUEST', dm: {dy: 1}});
    }

    //console.log(e.keyCode);
});
