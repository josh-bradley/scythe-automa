export default
{
  "automaLevels":[
    { "name": "Autometta", "level":1 },
    { "name": "Automa", "level":2 },
    { "name": "Automata", "level":3 },
    { "name": "Ultramata", "level":4 },
  ],
  "automaMoveData":{
    "moveWorker": { "type":"moveWorker", "description":"Move worker"},
    "encounter": { "type":"encounter", "description":"Encounter"},
    "moveCharacter": { "type":"moveCharacter", "description":"Move character"},
    "moveMech": { "type":"moveMech", "description":"Move mech"},
    "attack": { "type":"attack", "description":"Attack move"},
    "attackWorker": { "type":"attackWorker", "description":"Attack worker"},
  },
  "recruitBonusData":{
    "none":{"type":"none", "description":""},
    "coin":{"type":"coin", "description":"coin recruit bonus"},
    "popularity":{"type":"popularity", "description":"popularity recruit bonus"},
    "power":{"type":"power", "description":"power recruit bonus"},
    "powerCard":{"type":  "powerCard", "description":"power card recruit bonus"}
  },
  "factions":[
    { "id":"Polonia", "name": "Polonia"},
    { "id":"Saxony", "name": "Saxony"},
    { "id":"Crimean", "name": "Crimean"},
    { "id":"Nordic", "name": "Nordic"},
    { "id":"Rusviet", "name": "Rusviet"},
    { "id":"Albion", "name": "Albion"},
    { "id":"Togawa", "name": "Togawa"}
  ],
  "factionMats":{
    "Polonia":{ "combatCards": 3, "power":2},
    "Saxony":{ "combatCards": 4, "power":1},
    "Crimean":{ "combatCards": 0, "power":5},
    "Nordic":{ "combatCards": 1, "power":4},
    "Rusviet":{ "combatCards": 2, "power":3},
    "Albion":{ "combatCards": 0, "power":3},
    "Togawa":{ "combatCards": 2, "power":0}
  },
  "starCards":[
    {},
    {
      "id": 1,
      "riverCrossingPos":5,
      "schemePosition":10,
      "starPositions":[10,15,18,20,22,23]
    },
    {
      "id": 2,
      "riverCrossingPos":4,
      "schemePosition":9,
      "starPositions":[9,14,17,19,20,21]
    },
    {
      "id": 3,
      "riverCrossingPos":3,
      "schemePosition":9,
      "starPositions":[9,12,14,16,17,18]
    },
    {
      "id": 4,
      "riverCrossingPos":0,
      "schemePosition":8,
      "starPositions":[9,11,13,15,16,17]
    }
  ],
  "cards": [
    {},
    {
      "id":1,
      "star":true,
      "combartCards":1,
      "combatPoints": [
        6,
        7,
        7
      ],
      "resources":1,
      "schemeSpecific":[
      { 
        "power":1,
        "coins":0,
        "noplay":false,
        "powerCards":0,
        "workers":1,
        "mechs":0,
        "recruitBonus":"power",
        "factionSpecific":{
          "Polonia":{ "coins": 0, "power":0},"Saxony":{ "coins": 0, "power":0},"Crimean":{ "coins": 0, "power":0},"Nordic":{ "coins": 0, "power":0},"Rusviet":{ "coins": 0, "power":0}
        },
        "moves":[
          { "type": "moveWorker", "faction":"Nordic"},
          { "type": "encounter"},
          { "type": "moveCharacter"}
        ]
      },
      { 
        "power":4,
        "coins":0,
        "noplay":false,
        "powerCards":0,
        "workers":0,
        "mechs":0,
        "recruitBonus":"power",
        "factionSpecific":{
          "Polonia":{ "coins": 0, "power":0},"Saxony":{ "coins": 0, "power":0},"Crimean":{ "coins": 0, "power":0},"Nordic":{ "coins": 0, "power":0},"Rusviet":{ "coins": 0, "power":0}
        },
        "moves":[
          { "type": "moveWorker" }
        ]
      }]  
    },
    {
      "id":2,
      "star":true,
      "combartCards":2,
      "combatPoints": [
        5,
        6,
        7
      ],
      "resources":2,
      "schemeSpecific":[
      { 
        "power":0,
        "coins":1,
        "noplay":false,
        "powerCards":0,
        "workers":0,
        "mechs":0,
        "recruitBonus":"none",
        "factionSpecific":{
          "Polonia":{ "coins": 0, "power":0},"Saxony":{ "coins": 0, "power":0},"Crimean":{ "coins": 1, "power":0},"Nordic":{ "coins": 0, "power":0},"Rusviet":{ "coins": 0, "power":0}
        },
        "moves":[
          { "type": "encounter", "faction": "Polonia"},
          { "type": "moveWorker"}
        ]
      },
      { 
        "power":0,
        "coins":0,
        "noplay":false,
        "powerCards":1,
        "workers":0,
        "mechs":1,
        "recruitBonus":"coin",
        "factionSpecific":{
          "Polonia":{ "coins": 0, "power":0},"Saxony":{ "coins": 0, "power":0},"Crimean":{ "coins": 1, "power":0},"Nordic":{ "coins": 0, "power":0},"Rusviet":{ "coins": 0, "power":0}
        },
        "moves":[
          { "type": "encounter", "faction": "Polonia"},
          { "type": "moveWorker"}
        ]
      }]  
    },
    {
      "id":3,
      "star":true,
      "combartCards":0,
      "combatPoints": [
        3,
        7,
        7
      ],
      "resources":0,
      "schemeSpecific":[
      { 
        "power":3,
        "coins":0,
        "noplay":false,
        "powerCards":0,
        "workers":0,
        "mechs":0,
        "recruitBonus":"none",
        "factionSpecific":{
          "Polonia":{ "coins": 0, "power":0},"Saxony":{ "coins": 0, "power":0},"Crimean":{ "coins": 0, "power":0},"Nordic":{ "coins": 0, "power":0},"Rusviet":{ "coins": 0, "power":0}
        },
        "moves":[
          { "type": "moveWorker"}
        ]
      },
      { 
        "power":2,
        "coins":0,
        "noplay":false,
        "powerCards":0,
        "workers":1,
        "mechs":0,
        "recruitBonus":"popularity",
        "factionSpecific":{
          "Polonia":{ "coins": 0, "power":0},"Saxony":{ "coins": 0, "power":0},"Crimean":{ "coins": 0, "power":0},"Nordic":{ "coins": 0, "power":0},"Rusviet":{ "coins": 0, "power":0}
        },
        "moves":[
          { "type": "moveWorker"}
        ]
      }]  
    },
    {
      "id":4,
      "star":false,
      "combartCards":1,
      "combatPoints": [
        0,
        1,
        2
      ],
      "resources":0,
      "schemeSpecific":[
      { 
        "power":0,
        "coins":0,
        "noplay":true,
        "powerCards":1,
        "workers":0,
        "mechs":0,
        "recruitBonus":"powerCard",
        "factionSpecific":{
          "Polonia":{ "coins": 0, "power":0},"Saxony":{ "coins": 0, "power":0},"Crimean":{ "coins": 1, "power":0},"Nordic":{ "coins": 0, "power":0},"Rusviet":{ "coins": 0, "power":0}
        },
        "moves":[
          { "type": "moveWorker"}
        ]
      },
      { 
        "power":0,
        "coins":2,
        "noplay":true,
        "powerCards":0,
        "workers":0,
        "mechs":0,
        "recruitBonus":"power",
        "factionSpecific":{
          "Polonia":{ "coins": 0, "power":0},"Saxony":{ "coins": 0, "power":0},"Crimean":{ "coins": 1, "power":0},"Nordic":{ "coins": 0, "power":0},"Rusviet":{ "coins": 0, "power":0}
        },
        "moves":[
          { "type": "moveWorker"}
        ]
      }]  
    },
    {
      "id":5,
      "star":true,
      "combartCards":1,
      "combatPoints": [
        2,
        4,
        7
      ],
      "resources":4,
      "schemeSpecific":[
      { 
        "power":0,
        "coins":1,
        "noplay":false,
        "powerCards":0,
        "workers":1,
        "mechs":0,
        "recruitBonus":"coin",
        "factionSpecific":{
          "Polonia":{ "coins": 0, "power":0},"Saxony":{ "coins": 0, "power":0},"Crimean":{ "coins": 0, "power":0},"Nordic":{ "coins": 0, "power":0},"Rusviet":{ "coins": 0, "power":0}
        },
        "moves":[
          { "type": "moveWorker"}
        ]
      },
      { 
        "power":4,
        "coins":0,
        "noplay":false,
        "powerCards":0,
        "workers":1,
        "mechs":0,
        "recruitBonus":"powerCard",
        "factionSpecific":{
          "Polonia":{ "coins": 0, "power":0},"Saxony":{ "coins": 0, "power":0},"Crimean":{ "coins": 0, "power":0},"Nordic":{ "coins": 0, "power":0},"Rusviet":{ "coins": 0, "power":0}
        },
        "moves":[
          { "type": "moveMech"}
        ]
      }]  
    },
    {
      "id":6,
      "star":true,
      "combartCards":1,
      "combatPoints": [
        7,
        7,
        7
      ],
      "resources":0,
      "schemeSpecific":[
      { 
        "power":2,
        "coins":0,
        "noplay":false,
        "powerCards":0,
        "workers":0,
        "mechs":0,
        "recruitBonus":"none",
        "factionSpecific":{
          "Polonia":{ "coins": 0, "power":0},"Saxony":{ "coins": 0, "power":0},"Crimean":{ "coins": 0, "power":0},"Nordic":{ "coins": 0, "power":0},"Rusviet":{ "coins": 0, "power":0}
        },
        "moves":[
          { "type": "moveWorker"}
        ]
      },
      { 
        "power":2,
        "coins":0,
        "noplay":false,
        "powerCards":0,
        "workers":0,
        "mechs":1,
        "recruitBonus":"power",
        "factionSpecific":{
          "Polonia":{ "coins": 0, "power":0},"Saxony":{ "coins": 0, "power":0},"Crimean":{ "coins": 1, "power":0},"Nordic":{ "coins": 0, "power":0},"Rusviet":{ "coins": 0, "power":0}
        },
        "moves":[
          { "type": "moveMech"}
        ]
      }]  
    },
    {
      "id":7,
      "star":true,
      "combartCards":0,
      "combatPoints": [
        5,
        7,
        7
      ],
      "resources":2,
      "schemeSpecific":[
      { 
        "power":0,
        "coins":1,
        "noplay":true,
        "powerCards":0,
        "workers":1,
        "mechs":0,
        "recruitBonus":"popularity",
        "factionSpecific":{
          "Polonia":{ "coins": 0, "power":0},"Saxony":{ "coins": 0, "power":0},"Crimean":{ "coins": 0, "power":0},"Nordic":{ "coins": 0, "power":0},"Rusviet":{ "coins": 0, "power":0}
        },
        "moves":[
          { "type": "attack", "faction": "Saxony", "threshold":5},
          { "type": "moveWorker"},
        ]
      },
      { 
        "power":0,
        "coins":0,
        "noplay":true,
        "powerCards":1,
        "workers":0,
        "mechs":1,
        "recruitBonus":"coin",
        "factionSpecific":{
          "Polonia":{ "coins": 0, "power":0},"Saxony":{ "coins": 0, "power":0},"Crimean":{ "coins": 0, "power":0},"Nordic":{ "coins": 0, "power":0},"Rusviet":{ "coins": 0, "power":0, "mechs":1}
        },
        "moves":[
          { "type": "attack", "faction": "Saxony", "threshold":5},
          { "type": "moveMech"},
        ]
      }]  
    },
    {
      "id":8,
      "star":true,
      "combartCards":2,
      "combatPoints": [
        0,
        5,
        7
      ],
      "resources":1,
      "schemeSpecific":[
      { 
        "power":0,
        "coins":0,
        "noplay":true,
        "powerCards":0,
        "workers":0,
        "mechs":1,
        "recruitBonus":"none",
        "factionSpecific":{
          "Polonia":{ "coins": 0, "power":0},"Saxony":{ "coins": 0, "power":0},"Crimean":{ "coins": 0, "power":0},"Nordic":{ "coins": 0, "power":0},"Rusviet":{ "coins": 0, "power":0, "mechs":1}
        },
        "moves":[
          { "type": "moveMech"},
          { "type": "moveWorker"},
        ]
      },
      { 
        "power":0,
        "coins":1,
        "noplay":false,
        "powerCards":0,
        "workers":0,
        "mechs":1,
        "recruitBonus":"coin",
        "factionSpecific":{
          "Polonia":{ "coins": 0, "power":0},"Saxony":{ "coins": 0, "power":1},"Crimean":{ "coins": 0, "power":0},"Nordic":{ "coins": 0, "power":0},"Rusviet":{ "coins": 0, "power":0}
        },
        "moves":[
          { "type": "moveMech"},
        ]
      }]  
    },
    {
      "id":9,
      "star":true,
      "combartCards":1,
      "combatPoints": [
        4,
        7,
        7
      ],
      "resources":3,
      "schemeSpecific":[
      { 
        "power":0,
        "coins":0,
        "noplay":false,
        "powerCards":0,
        "workers":1,
        "mechs":1,
        "recruitBonus":"popularity",
        "factionSpecific":{
          "Polonia":{ "coins": 0, "power":0},"Saxony":{ "coins": 0, "power":0},"Crimean":{ "coins": 0, "power":0},"Nordic":{ "coins": 0, "power":0},"Rusviet":{ "coins": 0, "power":0}
        },
        "moves":[
          { "type": "encounter", "faction": "Polonia"},
          { "type": "moveMech"},
          { "type": "moveWorker"},
        ]
      },
      { 
        "power":3,
        "coins":0,
        "noplay":false,
        "powerCards":0,
        "workers":1,
        "mechs":0,
        "recruitBonus":"popularity",
        "factionSpecific":{
          "Polonia":{ "coins": 0, "power":0},"Saxony":{ "coins": 0, "power":0},"Crimean":{ "coins": 0, "power":0},"Nordic":{ "coins": 0, "power":0},"Rusviet":{ "coins": 0, "power":0}
        },
        "moves":[
          { "type": "encounter", "faction": "Polonia"},
          { "type": "moveMech"}
        ]
      }]  
    },
    {
      "id":10,
      "star":true,
      "combartCards":1,
      "combatPoints": [
        0,
        0,
        0
      ],
      "resources":1,
      "schemeSpecific":[
      { 
        "power":2,
        "coins":0,
        "noplay":false,
        "powerCards":0,
        "workers":0,
        "mechs":1,
        "recruitBonus":"none",
        "factionSpecific":{
          "Polonia":{ "coins": 0, "power":0},"Saxony":{ "coins": 0, "power":0},"Crimean":{ "coins": 0, "power":0},"Nordic":{ "coins": 0, "power":0},"Rusviet":{ "coins": 0, "power":0}
        },
        "moves":[
          { "type": "moveMech"},
          { "type": "moveWorker"},
        ]
      },
      { 
        "power":0,
        "coins":2,
        "noplay":false,
        "powerCards":0,
        "workers":0,
        "mechs":1,
        "recruitBonus":"none",
        "factionSpecific":{
          "Polonia":{ "coins": 0, "power":0},"Saxony":{ "coins": 0, "power":0},"Crimean":{ "coins": 0, "power":0},"Nordic":{ "coins": 0, "power":0},"Rusviet":{ "coins": 0, "power":0}
        },
        "moves":[
          { "type": "moveMech"}
        ]
      }]  
    },
    {
      "id":11,
      "star":true,
      "combartCards":2,
      "combatPoints": [
        6,
        7,
        7
      ],
      "resources":0,
      "schemeSpecific":[
      { 
        "power":0,
        "coins":1,
        "noplay":false,
        "powerCards":0,
        "workers":1,
        "mechs":0,
        "recruitBonus":"none",
        "factionSpecific":{
          "Polonia":{ "coins": 0, "power":0},"Saxony":{ "coins": 0, "power":0},"Crimean":{ "coins": 0, "power":0},"Nordic":{ "coins": 0, "power":0},"Rusviet":{ "coins": 0, "power":0,"workers":1}
        },
        "moves":[
          { "type": "moveMech"},
          { "type": "encounter"},
          { "type": "moveCharacter"}
        ]
      },
      { 
        "power":3,
        "coins":0,
        "noplay":false,
        "powerCards":0,
        "workers":1,
        "mechs":0,
        "recruitBonus":"powerCard",
        "factionSpecific":{
          "Polonia":{ "coins": 0, "power":0},"Saxony":{ "coins": 0, "power":0},"Crimean":{ "coins": 0, "power":0},"Nordic":{ "coins": 0, "power":0},"Rusviet":{ "coins": 0, "power":0}
        },
        "moves":[
          { "type": "moveWorker", "faction":"Nordic"},
          { "type": "encounter"},
          { "type": "moveCharacter"}
        ]
      }]  
    },
    {
      "id":12,
      "star":true,
      "combartCards":2,
      "combatPoints": [
        4,
        5,
        7
      ],
      "resources":1,
      "schemeSpecific":[
      { 
        "power":4,
        "coins":0,
        "noplay":false,
        "powerCards":0,
        "workers":0,
        "mechs":0,
        "recruitBonus":"none",
        "factionSpecific":{
          "Polonia":{ "coins": 0, "power":0},"Saxony":{ "coins": 0, "power":0},"Crimean":{ "coins": 0, "power":0},"Nordic":{ "coins": 0, "power":0},"Rusviet":{ "coins": 0, "power":0}
        },
        "moves":[
          { "type": "moveWorker", "faction":"Nordic"},
          { "type": "moveMech"}
        ]
      },
      { 
        "power":0,
        "coins":1,
        "noplay":false,
        "powerCards":1,
        "workers":0,
        "mechs":1,
        "recruitBonus":"power",
        "factionSpecific":{
          "Polonia":{ "coins": 0, "power":0},"Saxony":{ "coins": 0, "power":0},"Crimean":{ "coins": 0, "power":0},"Nordic":{ "coins": 0, "power":0},"Rusviet":{ "coins": 0, "power":0}
        },
        "moves":[
          { "type": "moveWorker", "faction":"Nordic"},
          { "type": "moveMech"}
        ]
      }]  
    },
    {
      "id":13,
      "star":true,
      "combartCards":3,
      "combatPoints": [
        3,
        5,
        7
      ],
      "resources":0,
      "schemeSpecific":[
      { 
        "power":0,
        "coins":1,
        "noplay":false,
        "powerCards":0,
        "workers":0,
        "mechs":0,
        "recruitBonus":"none",
        "factionSpecific":{
          "Polonia":{ "coins": 0, "power":0},"Saxony":{ "coins": 0, "power":0},"Crimean":{ "coins": 0, "power":0},"Nordic":{ "coins": 0, "power":0},"Rusviet":{ "coins": 0, "power":0}
        },
        "moves":[
          { "type": "attack", "faction":"Saxony", "threshold":4},
          { "type": "encounter"},
          { "type": "moveCharacter"}
        ]
      },
      { 
        "power":0,
        "coins":2,
        "noplay":false,
        "powerCards":1,
        "workers":0,
        "mechs":0,
        "recruitBonus":"coin",
        "factionSpecific":{
          "Polonia":{ "coins": 0, "power":0},"Saxony":{ "coins": 0, "power":0},"Crimean":{ "coins": 0, "power":0},"Nordic":{ "coins": 0, "power":0},"Rusviet":{ "coins": 0, "power":0}
        },
        "moves":[
          { "type": "attack", "faction":"Saxony", "threshold":5},
          { "type": "encounter"},
          { "type": "moveCharacter"}
        ]
      }]  
    },
    {
      "id":14,
      "star":true,
      "combartCards":1,
      "combatPoints": [
        1,
        1,
        1
      ],
      "resources":0,
      "schemeSpecific":[
      { 
        "power":0,
        "coins":0,
        "noplay":false,
        "powerCards":1,
        "workers":1,
        "mechs":0,
        "recruitBonus":"powerCard",
        "factionSpecific":{
          "Polonia":{ "coins": 0, "power":0},"Saxony":{ "coins": 0, "power":0},"Crimean":{ "coins": 0, "power":0},"Nordic":{ "coins": 0, "power":0},"Rusviet":{ "coins": 0, "power":0}
        },
        "moves":[
          { "type": "encounter"},
          { "type": "moveCharacter"}
        ]
      },
      { 
        "power":3,
        "coins":0,
        "noplay":false,
        "powerCards":0,
        "workers":0,
        "mechs":0,
        "recruitBonus":"popularity",
        "factionSpecific":{
          "Polonia":{ "coins": 0, "power":0},"Saxony":{ "coins": 0, "power":0},"Crimean":{ "coins": 0, "power":0},"Nordic":{ "coins": 0, "power":0},"Rusviet":{ "coins": 0, "power":0}
        },
        "moves":[
          { "type": "attack", "threshold":7},
          { "type": "attackWorker"},
          { "type": "moveMech"}
        ]
      }]  
    },
    {
      "id":15,
      "star":false,
      "combartCards":0,
      "combatPoints": [
        7,
        7,
        7
      ],
      "resources":2,
      "schemeSpecific":[
      { 
        "power":3,
        "coins":1,
        "noplay":false,
        "powerCards":0,
        "workers":0,
        "mechs":0,
        "recruitBonus":"coin",
        "factionSpecific":{
          "Polonia":{ "coins": 0, "power":0},"Saxony":{ "coins": 0, "power":0},"Crimean":{ "coins": 0, "power":0},"Nordic":{ "coins": 0, "power":0},"Rusviet":{ "coins": 0, "power":0}
        },
        "moves":[
          { "type": "encounter"},
          { "type": "moveCharacter"}
        ]
      },
      { 
        "power":0,
        "coins":1,
        "noplay":false,
        "powerCards":0,
        "workers":0,
        "mechs":0,
        "recruitBonus":"powerCard",
        "factionSpecific":{
          "Polonia":{ "coins": 0, "power":0},"Saxony":{ "coins": 0, "power":0},"Crimean":{ "coins": 1, "power":0},"Nordic":{ "coins": 0, "power":0},"Rusviet":{ "coins": 0, "power":0}
        },
        "moves":[
          { "type": "attack", "threshold":1},
          { "type": "attackWorker"},
          { "type": "encounter"},
          { "type": "moveCharacter"}
        ]
      }]  
    },
    {
      "id":16,
      "star":true,
      "combartCards":1,
      "combatPoints": [
        5,
        7,
        7
      ],
      "resources":4,
      "schemeSpecific":[
      { 
        "power":0,
        "coins":0,
        "noplay":false,
        "powerCards":0,
        "workers":0,
        "mechs":1,
        "recruitBonus":"none",
        "factionSpecific":{
          "Polonia":{ "coins": 0, "power":0},"Saxony":{ "coins": 0, "power":0},"Crimean":{ "coins": 0, "power":0},"Nordic":{ "coins": 0, "power":0},"Rusviet":{ "coins": 0, "power":0}
        },
        "moves":[
          { "type": "encounter"},
          { "type": "moveCharacter"}
        ]
      },
      { 
        "power":0,
        "coins":1,
        "noplay":false,
        "powerCards":0,
        "workers":0,
        "mechs":1,
        "recruitBonus":"none",
        "factionSpecific":{
          "Polonia":{ "coins": 0, "power":0},"Saxony":{ "coins": 0, "power":1},"Crimean":{ "coins": 0, "power":0},"Nordic":{ "coins": 0, "power":0},"Rusviet":{ "coins": 0, "power":0}
        },
        "moves":[
          { "type": "attack", "threshold":5},
          { "type": "attackWorker"},
          { "type": "moveMech"}
        ]
      }]  
    },
    {
      "id":17,
      "star":false,
      "combartCards":2,
      "combatPoints": [
        7,
        7,
        7
      ],
      "resources":2,
      "schemeSpecific":[
      { 
        "power":0,
        "coins":2,
        "noplay":true,
        "powerCards":0,
        "workers":0,
        "mechs":0,
        "recruitBonus":"power",
        "factionSpecific":{
          "Polonia":{ "coins": 0, "power":0},"Saxony":{ "coins": 0, "power":0},"Crimean":{ "coins": 0, "power":0},"Nordic":{ "coins": 0, "power":0},"Rusviet":{ "coins": 0, "power":0}
        },
        "moves":[
          { "type": "attack", "threshold":6},
          { "type": "attackWorker"},
          { "type": "moveWorker"}
        ]
      },
      { 
        "power":0,
        "coins":1,
        "noplay":true,
        "powerCards":0,
        "workers":1,
        "mechs":0,
        "recruitBonus":"popularity",
        "factionSpecific":{
          "Polonia":{ "coins": 0, "power":0},"Saxony":{ "coins": 0, "power":0},"Crimean":{ "coins": 1, "power":0},"Nordic":{ "coins": 0, "power":0},"Rusviet":{ "coins": 0, "power":0}
        },
        "moves":[
          { "type": "attack", "threshold":8},
          { "type": "moveWorker"}
        ]
      }]  
    },
    {
      "id":18,
      "star":true,
      "combartCards":0,
      "combatPoints": [
        1,
        1,
        7
      ],
      "resources":1,
      "schemeSpecific":[
      { 
        "power":0,
        "coins":1,
        "noplay":false,
        "powerCards":0,
        "workers":1,
        "mechs":0,
        "recruitBonus":"none",
        "factionSpecific":{
          "Polonia":{ "coins": 0, "power":0},"Saxony":{ "coins": 0, "power":0},"Crimean":{ "coins": 0, "power":0},"Nordic":{ "coins": 0, "power":0},"Rusviet":{ "coins": 0, "power":0}
        },
        "moves":[
          { "type": "encounter"},
          { "type": "moveCharacter"}
        ]
      },
      { 
        "power":0,
        "coins":2,
        "noplay":false,
        "powerCards":0,
        "workers":1,
        "mechs":0,
        "recruitBonus":"none",
        "factionSpecific":{
          "Polonia":{ "coins": 0, "power":0},"Saxony":{ "coins": 0, "power":0},"Crimean":{ "coins": 0, "power":0},"Nordic":{ "coins": 0, "power":0},"Rusviet":{ "coins": 0, "power":0}
        },
        "moves":[
          { "type": "encounter"},
          { "type": "moveCharacter"}
        ]
      }]  
    },
    {
      "id":19,
      "star":true,
      "combartCards":1,
      "combatPoints": [
        7,
        7,
        7
      ],
      "resources":1,
      "schemeSpecific":[
      { 
        "power":0,
        "coins":0,
        "noplay":false,
        "powerCards":0,
        "workers":1,
        "mechs":0,
        "recruitBonus":"none",
        "factionSpecific":{
          "Polonia":{ "coins": 0, "power":0},"Saxony":{ "coins": 0, "power":0},"Crimean":{ "coins": 0, "power":0},"Nordic":{ "coins": 0, "power":0},"Rusviet":{ "coins": 0, "power":0}
        },
        "moves":[
          { "type": "attackWorker"},
          { "type": "moveWorker"}
        ]
      },
      { 
        "power":3,
        "coins":1,
        "noplay":false,
        "powerCards":0,
        "workers":0,
        "mechs":0,
        "recruitBonus":"powerCard",
        "factionSpecific":{
          "Polonia":{ "coins": 0, "power":0},"Saxony":{ "coins": 0, "power":0},"Crimean":{ "coins": 0, "power":0},"Nordic":{ "coins": 0, "power":0},"Rusviet":{ "coins": 0, "power":0}
        },
        "moves":[
          { "type": "attackWorker"},
          { "type": "moveWorker"}
        ] 
      }]
    }
  ] 
}