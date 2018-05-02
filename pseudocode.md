# Strategy
- MongoDB vs MySQL?
  Game entities and rooms will be object-based
  - fresh game state
  - saved game states
- Will main game computing be done in App.js?
- Incorporated separate pages into single-page app so state is retained
  - "cannot update during an existing state transition"
  - bind method?
- Needs to incorporate turn-based timing for scripts
  - perhaps a function firing after a command has been issued, after interactions have been handled, iterating over all active entities
- How to place buttons that affect state

# Objects
  - Started with some constructor modules
  - How to build the environment, then move into state

# Unimplemented
- command parser
- room builds
- entity builds
  - action scripts
- styling
- User Authentication for save states
- dev testing to track entities

# Tech to explore
- Lodash
- Touch-screen friendly?
  - cardinal rose
  - touch entity to interact

# don't forget
- favicon.ico

# Gameplay timeline
- introduction text
- game start

