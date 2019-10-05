Scripts for *screeps*
=====================

https://screeps.com/

Project Setup
-------------

 1. Install `grunt-cli`.

    ```console
    > npm install -g grunt-cli
    ```

 2. Install project dependencies.

    ```console
    > npm install
    ```

 3. Create `.screeps.json`.

    ```json
    {
        "email": "<account email address>",
        "password": "<account password>",
        "branch": "dev",
        "ptr": false
    }
    ```

Build Commands
--------------

 *  Makes a production build and commits it to *screeps*.

    ```console
    > grunt
    ```

 *  Makes development builds and commits them to *screeps* whenever you
    change a source file.

    ```console
    > grunt watch
    ```

Ingame Commands
---------------

 *  Creates a new *builder*, *harvester* or *upgrader*.

    ```js
    Game.spawns["Spawn1"].spawnCreep([WORK, MOVE, CARRY], "H1", {
        memory: {role: "<role>"}
    });
    ```
