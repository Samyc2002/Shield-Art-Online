# API Documentation

This is exactly what you think it is.

## Available APIs

- Get Users API
  - Route: /users/
  - Method: GET
  - Query:
    - username: string (optional)
    - email: string (optional)
  - Authentication: Bearer token
  - Body: none
  - Example:

```js
    Query: {
        "username": "samy",
        "email": "200020040@iitdh.ac.in"
    }

    Response: {
        "data": [
            {
                "_id": "23456ujhgfdt678",
                "name": "samy",
                "email": "200020040@iitdh.ac.in",
                "level": 0,
                "stats": {
                    "health": 100,
                    "attack": 10,
                    "defense": 100,
                    "speed": 10,
                    "regeneration": 10,
                    "abilities": [],
                    "_id": "23456ujhgfdt678"
                },
                "jobs": [],
                "weapon": "",
                "inventory": [],
                "isActive": false,
                "__v": 0
            }
        ],
        "success": true
    }
```

- Login API
  - Route: /users/login
  - Method: POST
  - Query: none
  - Authentication: none
  - Body:
    - user.name: string
    - user.email: string
    - user.pass: string
    - user.isActive: boolean
    - Example:

```js
    Request: {
        "user": {
            "name": "samy",
            "email": "200020040@iitdh.ac.in",
            "pass": "123456",
            "isActive": false
        }
    }

    Response: {
        "data": {
            "user": {
                "id": "23456ujhgfdt678",
                "name": "samy",
                "email": "200020040@iitdh.ac.in",
                "isActive": false
            },
            "token": "XXX-XXX-XXX"
        },
        "sucess": true
    }
```

- Update User API
  - Route: /users/update
  - Method: PUT
  - Query:
    - username: string (optional)
    - email: string (optional)
  - Authentication: Bearer token
  - Body:
    - update.name: string
    - update.email: string
    - update.level: number
    - update.stats: Stats
    - update.jobs: string[]
    - update.weapon: string
    - update.inventory: string[]
    - update.isActive: boolean
    - Example:

```js
    Query: {
        "username": "samy",
        "email": "200020040@iitdh.ac.in"
    }

    Request: {
        "update": {
            "name": "samy",
            "email": "200020040@iitdh.ac.in",
            "level": 10,
            "stats": {
                "health": 100,
                "attack": 10,
                "defense": 100,
                "speed": 10,
                "regeneration": 10,
                "abilities": []
            },
            "jobs": [],
            "weapons": "sword",
            "inventory": [],
            "isActive": false
        }
    }

    Response: {
        "data": {
            "_id": "23456ujhgfdt678",
            "name": "samy",
            "email": "200020040@iitdh.ac.in",
            "level": 10,
            "stats": {
                "health": 100,
                "attack": 10,
                "defense": 100,
                "speed": 10,
                "regeneration": 10,
                "abilities": [],
                "_id": "23456ujhgfdt678"
            },
            "jobs": [],
            "weapon": "",
            "inventory": [],
            "isActive": false,
            "__v": 0
        },
        "success": true
    }
```

- Delete User API
  - Route: /users/delete
  - Method: DELETE
  - Query:
    - username: string (optional)
    - email: string (optional)
  - Authentication: Bearer token
  - Body: none
    - Example:

```js
    Query: {
        "username": "samy",
        "email": "200020040@iitdh.ac.in"
    }

    Response: {
        "data": {
            "_id": "23456ujhgfdt678",
            "name": "samy",
            "email": "200020040@iitdh.ac.in",
            "level": 10,
            "stats": {
                "health": 100,
                "attack": 10,
                "defense": 100,
                "speed": 10,
                "regeneration": 10,
                "abilities": [],
                "_id": "23456ujhgfdt678"
            },
            "jobs": [],
            "weapon": "",
            "inventory": [],
            "isActive": false,
            "__v": 0
        },
        "success": true
    }
```
