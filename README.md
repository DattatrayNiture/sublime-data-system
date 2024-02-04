#Sublime Data System Assignment Solution
# by Dattatray Niture

## description
- so as given in assignment I have created project using below technology
- Node.js 
- Express.js (framwork for node.js)
- MongoDB (database)
- mongoose (it is library used to create connection between MongoDB and the Node.js)
- dotenv (this module used to load environment variables from a .env file into process.env)
- joi (this library is used to provide validator for request object and object schema description )


## intro of project
- in this project we can create customer, with unique email, and also we can get customers details list
- also we can get cities with there customer count
- All fields required and the city and company should already exists for an existing customer.
- No new city or company can be added. ( means one customer can create on compnay with one email)

### Models
-customer Model
```yaml
{
  "_id":{ObjectId, mandatory, unique, bydefault mongodb creats},
  "first_name": {string, mandatory},
  "last_name": {string, mandatory},
  "city": {string, mandatory},
  "email": {string, unique,mandatory},
  "is_active": {boolen, default false},
  "created_At": {timestamp}
  "updated_At": {timestamp}
}
```

## services APIs
### POST /api/customer
- request body
```yaml
{
    "first_name":"chirag",
    "last_name":"vora" ,
    "city": "Ahmadabad",
    "company":"meal hub ltd" ,
    "email":"chirag@gmail.com"
}
```
- responce erros
```yaml
{
    "error": {
        "msg": "\"email\" is required",
        "code": 400
    }
}
```
```yaml
{
    "error": {
        "msg": "\"city\" is required",
        "code": 400
    }
}
```
- responce body (Json Data)
- status 201
```yaml
{
    "code": 201,
    "message": "customer created successfully",
    "data": {
        "customerDetails": {
            "first_name": "virendra",
            "last_name": "bhosale",
            "city": "ausa",
            "company": "viru hub ltd",
            "email": "virendrag@gmail.com",
            "is_active": true,
            "_id": "65bff5efaeba6ec82b142832",
            "created_At": "2024-02-04T20:39:11.423Z",
            "updated_At": "2024-02-04T20:39:11.423Z",
            "__v": 0
        }
    }
}
```


## order APIs 
### GET /api/customerlist
- here we will get a list of API with search by first_name, last_name and city with pagination.


- request body (Json Data)
```yaml
{
http://localhost:8000/api/customerlist?limit=2&page=1&first_name=Datt&last_name=nit&city=latu  
# here in param we wiill send filters like first_name, last_name,city also pagination is added
}
```
- responce body
- status 201
```yaml
{
    "code": 200,
    "message": "success",
    "data": {
        "customerList": [
            {
                "_id": "65bff5efaeba6ec82b142832",
                "first_name": "virendra",
                "last_name": "bhosale",
                "city": "ausa",
                "company": "viru hub ltd",
                "email": "virendrag@gmail.com",
                "is_active": true,
                "created_At": "2024-02-05 02:09:11",
                "updated_At": "2024-02-04T20:39:11.423Z",
                "__v": 0
            },
            {
                "_id": "65bfed1f85345ef8ee28c58f",
                "first_name": "chirag",
                "last_name": "vora",
                "city": "Ahmadabad",
                "company": "meal hub ltd",
                "email": "chirag@gmail.com",
                "is_active": true,
                "created_At": "2024-02-05 01:31:35",
                "updated_At": "2024-02-04T20:01:35.251Z",
                "__v": 0
            }
        ],
        "current": 1,
        "total_pages": 5,
        "total_items": 10
    }
}
```
### GET /api/customerbyid
- here we will get single customer details using there mongodb unique Id
### in filter we will send customerId through query parameters
- responce body
- status 200
```yaml
{
    "code": 200,
    "message": "success",
    "data": {
        "customerDetails": {
            "_id": "65bfaea6884b924b9a251341",
            "first_name": "Dattatray",
            "last_name": "Niture",
            "city": "Latur",
            "company": "meal hub ltd",
            "is_active": true,
            "created_At": "2024-02-04T15:35:02.302Z",
            "updated_At": "2024-02-04T15:35:02.302Z",
            "__v": 0
        }
    }
}
```
### GET /api/citylistwithcustomercount
- here we are get every unique city with there customer count
- responce body
- status 200
```yaml
{
    "code": 200,
    "message": "success",
    "data": {
        "city_wise_customer_count": [
            {
                "_id": "ausa",
                "count": 1
            },
            {
                "_id": "Ahmadabad",
                "count": 1
            },
            {
                "_id": "Surat",
                "count": 1
            },
            {
                "_id": "Latur",
                "count": 7
            }
        ],
        "current": 1,
        "total_pages": 1,
        "total_items": 4
    }
}
```
### What I would change if you built this for production
- here we can change lots of thing but firstly I will add user implementation and user can login using there username and password so one customer result can not affect on other 
- also I will add authentication
### instructions on how to setup the environment to run my project

- 1 clone reposatory
- 2 I haven't used git ignore so you can directly run the code but ones use npm i to install packages
- 3 after clone you can run command npm run start 
- 4 then use postman to hit the APi and as shown in above example you can send the body request
