Authentication
====================================================================
____________________________________________________________________

## 1) Authenticate with node:

    POST /api/login

#### Post Body:

    {
      "username": "michael",
      "password": "password"
    }

#### Results:

    {
        "name": "Michael Uranaka",
        "username": "michael",
        "_id": "545c2015e69ef3bc0e3e7c78",
        "__v": 0
    }

## 2) Logout with node:

    POST /api/logout

#### Results:

    {
      "status": "success"
    }


## 3) Check if a user is authenticated:

    GET /api/is_logged_in

#### Results:

    {
      "loggedIn": true,
      "user": {
        "name": "Michael Uranaka",
        "username": "michael",
        "_id": "545c2015e69ef3bc0e3e7c78",
        "__v": 0
      }
    }

 OR

    {
      "loggedIn": false
    }