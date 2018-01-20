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

                pp[pid] = obj.get('_pageid');
                const page = getObj('page', obj.get('_pageid'));
                const message = character.get('name') + ' moved to ' + page.get('name');
                messenger('gm', message);
            });
            Campaign().set({playerspecificpages: pp});
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
        moveSelectedHome = (selection) => {
            var pp = Campaign().get('playerspecificpages');
            Campaign().set({playerspecificpages: false}); // Force pp update
            _.map(selection, (selected) => {
                const token = getObj('graphic', selected._id);
                const character = getObj('character', token.get('represents'));
                const players = character.get('controlledby').split(',');
                _.map(players, (playerId) => {
                    delete pp[playerId];
                });
            });
            if (Object.keys(pp).length === 0) return Campaign().set('playerspecificpages', false);
            Campaign().set('playerspecificpages', pp);
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

            const selected = msg.selected;
            const homePage = getObj('page', Campaign().get('playerpageid'));
            const arg = msgFormula[2]?msgFormula[2].toUpperCase():undefined;
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
                messenger(msg.who, 'PlayerMover is now ' + boolToStr(state.mover.isOn));
                break;
            case 'ALLHERE':
                (() => {
                    const pageId = getObj('player', msg.playerid).get('_lastpage');
                    const page = getObj('page', pageId);
                    Campaign().set({playerpageid: pageId});
                    Campaign().set({playerspecificpages: false});
                    messenger(msg.who, 'ALL players are now on ' + page.get('name'));
                })();
                break;
            case 'HERE':
                if (!selected) return messenger(msg.who, 'Select at least 1 token or use !move ALLHERE');
                moveSelectedPlayers(msg.selected);
                break;
            case 'ALLHOME':
                Campaign().set({playerspecificpages: false});
                messenger(msg.who, 'ALL players are now on ' + homePage.get('name'));
                break;
            case 'HOME':
                if (!selected) return messenger(msg.who, 'Select at least 1 token or ALLHOME');
                moveSelectedHome(selected);
                messenger(msg.who, 'Moved ' + selected.length + ' to ' + homePage.get('name'));
                break;
            case 'OFFLINE':
                if (arg === undefined) return messenger(msg.who, 'This will ignore if players are offline<br> Use !MOVE OFFLINE on|off|toggle');
				switch (arg) {
				case 'ON':
					state.mover.ignore = true;
					break;
				case 'OFF':
					state.mover.ignore = false;
					break;
				case 'TOGGLE':
					state.mover.ignore = !state.mover.ignore;
					break;
				default:
					messenger(msg.who, 'This will ignore if players are offline<br>' + 'Use !move offline on|off|toggle');
					break;
				}
				messenger(msg.who, 'Ignore online requirement is ' + boolToStr(state.mover.ignore));
                break;
            case 'RESET':
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
        messenger = (who, msg) => sendChat('PlayerMover', '/w ' + who + ' &{template:5e-shaped}{{ ' + msg + ' }}', null, {noarchive:true}),
        boolToStr = (bool) => (bool?'ON':'OFF'),
        menu = (who) => {
            var message = 'PlayerMover is [' + boolToStr(state.mover.isOn) + '](!MOVE toggle)<br>'
                    + 'Ignore online requirement is [' + boolToStr(state.mover.ignore) + '](!MOVE offline toggle)<br>'
                    + '-----<br>'
                    + '[Move SELECTED players HERE](!MOVE here)<br>'
                    + '[Move ALL players HERE](!MOVE allhere)<br>'
                    + '-----<br>'
                    + '[Move SELECTED players HOME](!MOVE home)<br>'
                    + '[Move ALL players HOME](!MOVE allhome)<br>';
            messenger(who, message);
        },
        registerEventHandlers = function() {
            // To handle copy/paste and drag&drop we need 2 triggers
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