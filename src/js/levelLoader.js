import set1 from '../levels/set1';  

var set;
var levelIndex = 0;

function parseLevelFile(content){
	//	return levelSet = {title..., [levels]}

	var levels = [];
	var rows = content.split('\n');

	var title = rows[0];
	var copyright = rows[2];
	var email = rows[3];
	var start=9;
	var level, parsed;

	for(var i=9; i<rows.length; i++){
		if(rows[i][0]===";"){
			level = rows.slice(start, i);
			parsed = parseLevelText(level);
			levels.push(parsed);
			start = i+2;
		}
	}

	return {
		title: title,
		copyright: copyright,
		email: email,
		levels: levels
	}
}

function parseLevelText(levelArr){

	// return state = [[row1],[row2]];

	var level = levelArr.map(row => {
		return row.split('');
	});

	return { 
		id: Math.floor(Math.random() * 10000),
		level: level
	};
}

function getNextLevel(cb){
	set = set || parseLevelFile(set1);
	var level = set.levels[levelIndex++];

	console.log(level);

	return level;
}

export default {
	getNextLevel: getNextLevel
}