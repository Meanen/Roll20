// By: Meanen
//Script: Player mover
//Roll20 Thread:
//Roll20 Contact: 
var SuicideKnights = SuicideKnights || (function() {
    'use strict';
    const version = '0.1.0.0',
    schemaVersion = '0.1.0.0',
    notifyObservers = (event) => {
        _.each(observers[event], (handler) => {
            handler();
        });
    },
    getFullList = () => {
        const allPlayers = getAllPlayers();

        if (state.lootScore === undefined) {
            state.lootScore = {list: []};
        }

        let scoreBoard = state.lootScore.list;

        // Generate scoreboard on first use.
        if (scoreBoard.length === 0) {
            log('Generate new player list');
            scoreBoard = [];
            _.each(allPlayers, (player) => {
                scoreBoard.push(player.get('_id'));
            });
            scoreBoard = _.shuffle(scoreBoard);
            state.lootScore.list = scoreBoard;      
        } else {
            // Check if new players have arrived and add at random index
            log('Read players from memory');
            _.each(allPlayers, (player) => {
                if (scoreBoard.indexOf(player.get('_id')) === -1) {
                    log('Add new player!');
                    const index = randomInteger(scoreBoard.length-1);
                    scoreBoard.splice(index, 0, player.get('_id'));
                    state.lootScore.list = scoreBoard;
                }
            });
        }
        log(state.lootScore.list);
        return scoreBoard;
    },
    movetoBottom = (playerId) => {
        const list = getFullList();
        const index = list.indexOf(playerId);
        if (index > -1) list.splice(index, 1);
        list.push(playerId);
    },
    getListFromPage = (playerId) => {
        const player = getObj('player', playerId);
        const map = player.get('_lastpage');
        let playerPages = Campaign().get('playerspecificpages');
        playerPages = _.isObject(playerPages) ? playerPages : {};

        const keys = Object.keys(playerPages);
        const values = Object.values(playerPages);
        const playersOnPage = [];

        for (var i=0; i<values.length; i++) {
            if (values[i] === map) {
                playersOnPage.push(keys[i]);
            }
        }
        const list = getAllPlayers();
        const out = [];
        for (var i=0; i<list.length; i++) {
            if (playersOnPage.indexOf(list[i]) >= -1) {
                log('found ' + list[i]);
                out.push(list[i]);
            }
        }
        log(out);
        return out;
    },
    print = (list) => {
        let msg = '';
        let index = 1;
        _.each(list, (playerId) => {
            const player = getObj('player', playerId);
            const playerName = player.get('_displayname');
            msg += `${index++} - ${playerName}<br> `;
        });
        messenger('gm', msg);
    },
    handleInput = (msg) => {
        var msgFormula = msg.content.toUpperCase().split(/\s+/);
        var command = msgFormula[0];
        if (!playerIsGM(msg.playerid) || msg.type != 'api' || command.indexOf('!LOOT') === -1) return;

        const option = msgFormula[1];
        if (isBlank(option)) return menu(msg.who);

        const selected = msg.selected;
        const homePage = getObj('page', Campaign().get('playerpageid'));
        const arg = msgFormula[2];
        switch(option) {
        case 'ALL':
            print(getFullList());
            break;
        case 'HERE':
            print(getListFromPage(msg.playerid));
            break;
        case 'PURCHASE':
            movetoBottom(msg.playerid);
            break;
        case 'RESET':
            messenger(msg.who, 'SuicideKnights is now RESET!');
            break;
        default:
            messenger(msg.who, 'What?');
            return;
        }
    },
    // Helper methods
    getAllPlayers = () => {
        return filterObjs((obj) => {    
            return (obj.get('_type') === 'player');
        });
    },
    messenger = (who, msg) => sendChat('LootHelper', `/w ${who} &{template:5e-shaped}{{ ${msg} }}`, null, {noarchive:true}),
    boolToStr = (bool) => (bool?'ON':'OFF'),
    isBlank = (obj) => (obj === undefined ||
                obj === [] ||
                obj === '' ||
                (_.isObject(obj) && Object.keys(obj).length === 0)),
    menu = (who) => (messenger(who, 'SuicideKnights is')),
    registerEventHandlers = function() {
        // To handle copy/paste and drag&drop we need 2 triggers
        on('chat:message', handleInput);
    };
    // RETURN OUTSIDE FUNCTIONS
    return {
        RegisterEventHandlers: registerEventHandlers
    };
}());
// On Ready
on('ready', function() {
    'use strict';
    SuicideKnights.RegisterEventHandlers();
});