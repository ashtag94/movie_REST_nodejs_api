# Nodejs REST api for mlisting movies

Function :-
1. List movies in database
2. Accept new movies in database
3. Update and Delete movies in database

# Resources exposed

## 1. /movies

# GET
It return a list of all movies in the database

# POST
It adds new movie to database. POST request should be provided with JSON payload in the body of request with follwoing schema
Schema for movie
{
    name: String,
    price: Number
}

# 2. /movies/{:ID}

## GET
returns details of single movie idetified by {:ID}

## PATCH
Used for Updating existent properties of the a movie. No new properties can be added by this request
Patch request should be sent by body containg a list of objects defining the property and value to be changed. Follwoing is the syntax for body of PATCH request :-

[
    {
        "propName": "<name of property you want to change>",
        "value": "<new value of the property>"
    }
]

## DELETE
deletes the movie in database identified by {:ID}


# Heroku
Link = https://enigmatic-atoll-82259.herokuapp.com/

