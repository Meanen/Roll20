# Roll20/API/PlayerMover

For now it only works on 5e shaped due to the message template used.

This script will move players automatically when a token that they own is moved to a page, allow you to move selected tokens to your current page and return them to the default page.

API:
  !MOVE (command) (arg)

Typing only !move will open the options.

arg uses:

ON: Moves owners of the token when moving a token to a new page.

OFF: Will deactivate automatic transfer of players.

ALLHERE: Will set the default page to your current page and move all players there.

HERE: Will move the owners of the selected tokens to your current page.

ALLHOME: Moves all players to the default page.

HOME: Moves owners of the selected token to the default page.

OFFLINE ON: Moving or creating tokens will only transfer online players.

OFFLINE OFF: Moving tokens will transfer both online and offline players.
