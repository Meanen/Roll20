# Roll20/API/PlayerMover

For now it only works on 5e shaped.

This will move players automatically when a token that they own is moved to a page, allow you to move selected tokens to your current page and return them to the default page.

API:
  !MOVE (command) (arg)

Typing only !move will open the options.

arg uses:
ON: Will activate automatic transfer of players when token is created.
OFF: Will deactivate automatic transfer of players when token is created.
HERE: Will move players owning your selected tokens to your current page.
HOME: Moves all players to the default page.
OFFLINE ON: Moving tokens will only transfer online players.
OFFLINE OFF: Moving tokens will transfer both online and offline players.
