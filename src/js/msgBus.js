
var msgBus = {

	callbacks: {
		"init": []
	},

	emit: (chn, msg)=> {
		if(!msgBus.callbacks[chn]) return;

		var cbArray = msgBus.callbacks[chn];
		for(var i=0; i<cbArray.length; i++){
			var fn = msgBus.callbacks[chn][i];
			fn.apply();
		}
	},

	on: (chn, cb)=> {
		msgBus.callbacks[chn] = msgBus.callbacks[chn] || [];
		msgBus.callbacks[chn].push(cb);
	} 
}

export default msgBus;


/*
msgBus.emit('player.move', {dx: 1});
msgBus.on('player.move', ()=> {
	//cb
});
*/