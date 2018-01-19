// By: Meanen
//Script: Player mover
//Roll20 Thread:
//Roll20 Contact: 
var PlayerMover = PlayerMover || (function() {
    'use strict';
    var version = '0.1.0.0',
        lastUpdate = 1444174668,
        schemaVersion = '0.1.0.0',
        observers = {
            turnOrderChange: []
        },

        notifyObservers = function(event) {
            _.each(observers[event], function(handler) {
                handler();
            });
        },
       
        handleMove = (obj) => {
            if (!state.mover.isOn || obj === undefined) return;

            const representedBy = obj.get('represents');
            if (representedBy === '' || obj.get('layer') != 'objects') return;

			const character = getObj('character', representedBy);
			const players = character.get('controlledby').split(',');
			
            if (players === undefined || players.length === 0) return;
			if (players[0] === '' || players.indexOf('all') >= 0) return;
			
			var pp = Campaign().get('playerspecificpages');
            Campaign().set({playerspecificpages: false}); // Force pp update
            pp = (_.isObject(pp) ? pp : {});
            
            players.map((pid) => {
                // TODO: check if pet, use state, create API
                if (!getObj('player', pid).get('_online') && !state.mover.ignore) return;
                if (getPlayerTokens().indexOf(character.get('_id')) === -1) {
                    log('This is a pet!');
                    return;
                }
                delete pp[pid];
                Campaign().set({playerspecificpages: pp});
                pp[pid] = obj.get('_pageid');
                const page = getObj('page', obj.get('_pageid'));
                const message = character.get('name') + ' moved to ' + page.get('name');
                messenger('gm', message);
            });
            
            Campaign().set({playerspecificpages: pp});
        },
		handleInput = (msg) => {
			var msgFormula = msg.content.split(/\s+/);
            var command = msgFormula[0].toUpperCase();
            if (msg.type != 'api' || command.indexOf('!MOVE') === -1) return;
            if (!playerIsGM(msg.playerid)) return;

            const option = msgFormula[1];
            if (option === undefined) {
                menu(msg.who);
                return;
            }
            switch(msgFormula[1].toUpperCase()) {
                case 'ON':
                    state.mover.isOn = true;
                    messenger(msg.who, 'PlayerMover is now ON');
                    break;
                case 'OFF':
                    state.mover.isOn = false;
                    messenger(msg.who, 'PlayerMover is now OFF');
                    break;
                case 'TOGGLE':
                    state.mover.isOn = !state.mover.isOn;
                    const moveState = boolToStr(state.mover.isOn);
                    messenger(msg.who, 'PlayerMover is now ' + moveState);
                    break;
                case 'HERE':
                    moveSelectedPlayers(msg.selected);
                    break;
				case: 'HOME':
					Campaign().set({playerspecificpages: false}); // Force pp update
					break;
                case 'OFFLINE':
                    if (msgFormula[2] === undefined) {
                        messenger(msg.who, 'This will ignore if players are offline<br>'
                            + 'Use !move ignore on|off|toggle');
                        return;
                    }
                    var arg = msgFormula[2].toUpperCase()
                    if (arg === 'ON') {
                        state.mover.ignore = true;
                    } else if (arg === 'OFF') {
                        state.mover.ignore = false;
                    } else if (arg === 'TOGGLE') {
                        state.mover.ignore = !state.mover.ignore;
                    } else {
                        messenger(msg.who, 'This will ignore if players are offline<br>'
                            + 'Use !move offline on|off|toggle');
                    }
                    messenger(msg.who, 'Ignore offline is ' + boolToStr(state.mover.ignore));
                    break;
                case 'RESET':					
                    state.mover.players = {};
                    state.mover.ignore = false;
                    state.mover.isOn = true;
                    messenger(msg.who, 'PlayerMover is now RESET!');
                    break;
                default:
                    messenger(msg.who, 'What?');
                    return;
            }
		},
		// Helper methods
		menu = (who) => {
		    var message = 'PlayerMover is [' + boolToStr(state.mover.isOn) + '](!MOVE toggle)<br>'
		            + 'Ignore online requirement is [' + boolToStr(state.mover.ignore) + '](!MOVE offline toggle)<br>'
		            + '[Move to selected players here](!MOVE here)<br>'
		            + '[RESET PlayerMover](!MOVE home) (All players to default)';
		    messenger(who, message);
		},
		messenger = (who, msg) => sendChat('PlayerMover', '/w ' + who + ' &{template:5e-shaped}{{ ' + msg + ' }}', null, {noarchive:true}),
		boolToStr = (bool) => {
		    return bool?'ON':'OFF';
		},
		getPlayerTokens = () => {
            const timeDiff = new Date().getTime() - state.mover.players.updated;
            if (timeDiff < 43200000 || state.mover.players.length < 1) {
                log('Use cached player list.')
                return state.mover.players.list;
            }
            log('Genererate new player list.');
            const journal = JSON.parse(Campaign().get('_journalfolder'));
            var players = [];
            for(var i=0;i<journal.length;i++) {
                if (journal[i].n && journal[i].n === 'Player Fallen') {
                    log('FOUND PLAYERS');
                    players = journal[i].i;
                    break;
                }
            }
            state.mover.players.list = players;
            state.mover.players.updated = new Date().getTime();
            return players;
		},
		moveSelectedPlayers = (selection) => {
		    const prevState = state.mover.isOn
		    state.mover.isOn = true;
		    state.mover.ignore = true;
		    
		    _.map(selection, (selected) => {
		        const token = getObj('graphic', selected._id);
		        handleMove(token);
		    });
		    
		    state.mover.ignore = false;
		    state.mover.isOn = state.mover.isOn;
		},
        registerEventHandlers = function() {
            on('add:token', handleMove);
            on('change:graphic:represents', handleMove);
            on('chat:message', handleInput);
        };
    /*-------------
        RETURN OUTSIDE FUNCTIONS
        -----------*/
    return {
        RegisterEventHandlers: registerEventHandlers
    };
}());
//On Ready
on('ready', function() {
    'use strict';
    PlayerMover.RegisterEventHandlers();
});