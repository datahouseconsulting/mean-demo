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

    HTTP Status 200

    {
        "name": "Michael Uranaka",
        "username": "michael",
        "_id": "545c2015e69ef3bc0e3e7c78",
        "__v": 0
    }

OR

    HTTP Status 500

    <Stack Trace>

## 2) Logout with node:

    POST /api/logout

#### Results:

    HTTP Status 200
    
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


Application Objects
====================================================================
____________________________________________________________________


## 1) Create an application:

    POST /api/applications

#### Post Body:

    {
      "title": "some title",
      "objective": "some objective",
      "description": "some description",
      "status": "some status"
    }

#### Results:

    HTTP Status 200

    {
      "__v": 0,
      "title": "some title",
      "objective": "some objective",
      "description": "some description",
      "status": "some status",
      "_id": "545c6759702eef12041a0141"
    }

OR

    HTTP Status 500

    <Stack Trace>


## 2) Get all applications:

    GET /api/applications

#### Results:

    HTTP Status 200

    [
      {
        "title": "some title",
        "objective": "some objective",
        "description": "some description",
        "status": "some status",
        "_id": "545c6759702eef12041a0141",
        "__v": 0
      },
      {
        "title": "some title",
        "objective": "some objective",
        "description": "some description",
        "status": "some status",
        "_id": "545c6759702eef12041a0142",
        "__v": 0
      }
    ]

OR

    HTTP Status 500

    <Stack Trace>