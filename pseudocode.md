# Strategy
- MongoDB vs MySQL?
  Game entities and rooms will be object-based
  - fresh game state
  - saved game states
- Incorporated separate pages into single-page app so state is retained
  - "cannot update during an existing state transition"
  - bind method?
- Needs to incorporate turn-based timing for scripts
  - perhaps a function firing after a command has been issued, after interactions have been handled, iterating over all active entities
- User Authentication
  - where login/logout buttons need to be placed
  - proper info passing into Dashboard
  - load game button rendering (moot until game save functionality is in place)


# Objects
  - Started with some constructor modules
  - How to build the environment, then move into state

# Unimplemented
- entity builds
  - action scripts
- save states
- dev testing to track entities

# Tech to explore
- Lodash
- Touch-screen friendly?
  - cardinal rose
  - touch entity to interact

# don't forget

# Gameplay timeline
- introduction text
- game start

