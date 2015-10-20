// validate a move request (dm)
function tryToMove(state, dm){

	var player = getPlayer(state);
	var target = getTile(state, player, dm);
	var back = getTile(state, target, dm);

	// free to move there
	if( target.type === " " || target.type === ".") {
		let player_moved = movePlayer(state, player, dm);
		return player_moved;
	}

	// move the box
	if( (back.type === " " || back.type === ".") &&
		(target.type === "$" || target.type === "*") )
	{
		let box_moved = moveBox(state, player, target, back, dm);
		return box_moved;
	}

	return state;
}

// get player position and type
function getPlayer(state){

	var type, posX, posY;

	state.level.map((row, y) => {
		row.map((cell, x) => {
			if(cell === "@" || cell === "+"){
				posX = x;
				posY = y;
				type = cell;
			}
		});
	});

	return {x: posX, y: posY, type: type};
}

// get the tile at the target x,y position
function getTile(state, target, dm){
	var tile = {
		x: target.x + (dm.dx || 0),
		y: target.y + (dm.dy || 0),
		type: null
	};

	if(tile.y < state.level.length && tile.y > 0 && tile.x > 0){
		tile.type = state.level[tile.y][tile.x];
	}

	return tile;
}


// update player pos
function movePlayer(state, position, dm){

	var newPlayerPos = {
		x: position.x + (dm.dx || 0),
		y: position.y + (dm.dy || 0)
	};

	var tile = state.level[position.y][position.x];	// the tile currently represens player
	var targetTile = state.level[newPlayerPos.y][newPlayerPos.x];	// whats now on the target
	var updateTile, oldTile;

	if(targetTile === " ") updateTile = "@";	// just player
	if(targetTile === ".") updateTile = "+";	// player on goal square
	
	if(tile === "@") oldTile = " ";
	if(tile === "+") oldTile = ".";

	var player_moved = updateCell(state.level, newPlayerPos, updateTile);
	player_moved = updateCell(player_moved, position, oldTile);

	return {
		level: player_moved
	};
}

// update box position
function moveBox(state, player, box, target, dm){

	var tile = box.type;
	var targetTile = target.type;
	var updateTarget, updateTile, updatePlayer;

	if(tile === "$") {
		updateTile = "@";
		if(targetTile === ".") updateTarget = "*";
		if(targetTile === " ") updateTarget = "$";
	}

	if(tile === "*"){
		updateTile = "+";
		if(targetTile === ".") updateTarget = "*";
		if(targetTile === " ") updateTarget = "$";
	} 

	if(player.type === "@") updatePlayer = " ";
	if(player.type === "+") updatePlayer = ".";

	var playerUpdate = updateCell(state.level, player, updatePlayer);
	var targetUpdated = updateCell(playerUpdate, target, updateTarget);
	var tileUpdated = updateCell(targetUpdated, box, updateTile);

	return {
		level: tileUpdated
	};
}

// immutable cell update 
function updateCell(level, pos, newVal){
	var row = level[pos.y];
	var newRow = [].concat( row.slice(0, pos.x), newVal, row.slice(pos.x+1) );
	var newLevel = [].concat( level.slice(0, pos.y), [newRow], level.slice(pos.y+1) );

	return newLevel;
}

export default {
	tryToMove: tryToMove
}