import React from 'react';  
import SokobanGame from './js/Components/GameContainer'; 
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import resources from './js/resourceLoader';
import levelManager from './js/levelManager';
import levelLoader from './js/levelLoader';

var initialState;
var appStates = [initialState];
var stateIndex = 0;
let store;

// main reducer
function reactSokoban (state, action) {

	switch(action.type) {
	case 'UNDO': 
		return stateIndex > 0 ? appStates[--stateIndex] : appStates[stateIndex];
		break;

	case 'PLAYER_MOVE_REQUEST':
		var nextState = levelManager.tryToMove(state, action.dm);

		if(nextState !== state){
			pushState(nextState);
		}
	
		return nextState;
		break;

	case 'NEXT_LEVEL':
		return levelLoader.getNextLevel();
		break;

	default: 
		return state;
	}
};


// save state in state-history
function pushState(state){
	appStates = appStates.splice(0, ++stateIndex);
	appStates.push(state);
}

// initial render
function render(){
	React.render( <Provider store={store}>
			    {() => <SokobanGame />}
			  </Provider>, document.getElementById('content') );
}

// player movement 
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
});

// load resources (images)
resources.loadImages({
	box: "images/box.png", 
	pad: "images/pad.png", 
	box_done: "images/box_done.png",
	wall: "images/wall.png",
	player: "images/player.png",
	empty: "images/empty.png"
}, 
function(){
	initialState = levelLoader.getNextLevel();
	store = createStore(reactSokoban, initialState);
	render();
});
