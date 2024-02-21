## TODO API WITH DB

### DB SQL SCRIPT
```sql
CREATE DATABASE posts;

USE posts;

CREATE TABLE tbl_user (
    id INT IDENTITY(1,1) PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    photo_url VARCHAR(255) NULL
);

CREATE TABLE tbl_post (
    id INT PRIMARY KEY IDENTITY(1,1),
    post_title VARCHAR(255) NOT NULL,
    post_content VARCHAR(MAX) NOT NULL,
    author VARCHAR(100) NOT NULL,
    user_id INT NOT NULL, -- Assuming user_id is the foreign key column
    created_at DATETIME DEFAULT GETDATE(),
    CONSTRAINT FK_User_Post FOREIGN KEY (user_id) REFERENCES tbl_user(id)
);




```
### API CONFIGS
- create a dotenv file with the following content
```dotenv
# SQL CONFIG FOR LOCAL DEV
SQL_USER= sa
SQL_PASSWORD= root
SQL_DB= todo
SQL_SERVER= localhost
SQL_ENCRYPT= false #  true for azure & false for local dev
SQL_SERVER_PORT= 1433 # if localhost doesnt work, try 127.0.0.1
SQL_TRUST_SERVER_CERTIFICATE= true #true for local dev, false for azure

# API CONFIG
API_PORT= 8000
``` 

### API ENDPOINTS
``` javascript

//health check
GET http://localhost:8000/health
//get all todos
###
GET http://localhost:8000/todos

### Request // filter todos with pages and limit
GET http://localhost:8000/todos?page=4&limit=3

### Request // order todos asc or desc
GET http://localhost:8000/todos?order=desc 

### Request // filter todos with pages and limit && order todos asc or desc
GET http://localhost:8000/todos?page=1&limit=3&order=asc

### //get todo by id
GET http://localhost:8000/todos/11

### //create todo
POST http://localhost:8000/todos 
content-Type: application/json

{
    "title": "todo from rest client1",
    "completed" : 1
}

### //update todo
PUT http://localhost:8000/todos/11
Content-Type: application/json

{
  "title": "test",
  "completed" :  0    
}

### //complete a todo
PATCH  http://localhost:8000/todos/11
Content-Type: application/json

{
  "completed" :  0    
}

### //delete todo
DELETE http://localhost:8000/todos/11
```