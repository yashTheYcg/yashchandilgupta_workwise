
# simple e-commerce application Rest API with user authentication




## Tech Stack

**Server:** Node, Express

**Database:** Postgres

**Cloud:** Render 


## Setup Locally

#### First clone using git
```
git clone https://github.com/yashTheYcg/yashchandilgupta_workwise
```

#### Move to folder yashchandilgupta_workwise
```
cd yashchandilgupta_workwise
```

#### Now install all dependencies using npm
```
npm install
```

#### Make a config file name - config.env & add the following details
```
# for jwt tokens
JWT_SECRET=
# for postgres pool configuration
DATABASE=
DATABASE_USER=
DATABASE_HOST=
DATABASE_PASSWORD=
DATABASE_PORT=
```

#### Now you are ready to go
```
node index.js
```

#### Output
```
Server started at 3000
Postgres connected
```
## API Reference

#### Endpoints
- [Signup](#signup)
- [Login](#login)
- [Add Product](#add-product)
- [Delete Product](#delete-product)
- [Search Product](#search-product)
- [Add To Cart](#add-to-cart)
- [Remove From Cart](#remove-from-cart)

### Baseurl 
```http
https://yashchandilgupta-workwise.onrender.com/
```

### Signup 

**Request:**
```json
POST /api/v1/signup HTTP/1.1
Accept: application/json
Content-Type: application/json

{
  "email":"seller@gmail.com",
  "password":"test@123",
  "type":"seller"
}
```
**Response:**
```json
{
  "message": "User registered successfully"
}
```

### Login

**Request:**
```json
POST /api/v1/login HTTP/1.1
Accept: application/json
Content-Type: application/json

{
    "email": "seller@gmail.com",
    "password": "test@123" 
}
```
**Response:**
```json
{
  "message": "Login Successfully",
  "authtoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiMjExMjVjMjYtNGZkNC00N2FkLTg1YmMtMDkwNzg3ZTM2YzBlIiwidHlwZSI6InNlbGxlciJ9LCJpYXQiOjE3MjYyMzQyMDUsImV4cCI6MTcyNjQwNzAwNX0.DNDC1eqRZbmBIv-BQZ8n-hv4j5rqB-okyTHaxgrCQoU",
  "type": "seller"
}
```

### Add Product
Only seller can add product

**Request:**
```json
POST /api/v1/product HTTP/1.1
Accept: application/json
Content-Type: application/json
Authorization: Bearer <jwt_token>

{
  "name": "dark chocklate",
  "category": "beverage",
  "description": "this is the dark chocklate from Cadbury",
  "price": 20,
  "discount": 0.0
}
```
**Response:**
```json
{
  "message": "Product added successfully"
}
```

### Edit Product
Only seller can edit his/her Product

**Request:**
```json
PUT /api/v1/product/:productId HTTP/1.1
Accept: application/json
Content-Type: application/json
Authorization: Bearer <jwt_token>

{
  "name": "dark chocklate 10% extra",
  "category": "beverage",
  "description": "this is the dark chocklate from Cadbury",
  "price": 30,
  "discount": 0.1
}
```
**Response:**
```json
{
  "message": "Product updated successfully"
}
```

### Delete Product
Only seller can delete his/her Product

```json
DELETE /api/v1/product/:productId HTTP/1.1
Accept: application/json
Content-Type: application/json
Authorization: Bearer <jwt_token>

```
**Response:**
```json
{
  "message": "Product deleted successfully"
}
```

### Search Product
Any valid user can search product using name or category

* Without using name or category

**Request:**
```json
GET /api/v1/product HTTP/1.1
Accept: application/json
Content-Type: application/json
Authorization: Bearer <jwt_token>

```
**Response:**
```json
[
  {
    "productid": "6c31f408-6bca-4bdc-b184-e9dcbbe88ae9",
    "name": "iphone 14 pro max",
    "category": "electronics",
    "description": "this is a gadget in electronics",
    "price": "200",
    "discount": "0",
    "sellerid": "21125c26-4fd4-47ad-85bc-090787e36c0e"
  },
  {
    "productid": "9ff92453-7d89-40bd-922c-363dcfba2a63",
    "name": "iphone 14 pro charger",
    "category": "electronics",
    "description": "this is a charger of iphone",
    "price": "50",
    "discount": "0.1",
    "sellerid": "21125c26-4fd4-47ad-85bc-090787e36c0e"
  },
  {
    "productid": "3854fe28-c0ee-4fc9-9a87-638fbe49d869",
    "name": "puma hat",
    "category": "clothes",
    "description": "this is a puma hat made by 100% faberic",
    "price": "50",
    "discount": "0.1",
    "sellerid": "21125c26-4fd4-47ad-85bc-090787e36c0e"
  },
  {
    "productid": "7a8ef457-3005-422a-bb51-f19cccbf81ab",
    "name": "Nike Upper",
    "category": "clothes",
    "description": "this is a upper made by 100% cotton from Nike official",
    "price": "100",
    "discount": "0.23",
    "sellerid": "21125c26-4fd4-47ad-85bc-090787e36c0e"
  },
  {
    "productid": "253b1ee1-9e75-41e8-be0f-394f2eb0883a",
    "name": "Nike shoes",
    "category": "footwear",
    "description": "this is the running shoes from Nike official",
    "price": "300",
    "discount": "0",
    "sellerid": "21125c26-4fd4-47ad-85bc-090787e36c0e"
  }
]
```
* With using name query

**Request:**
```json
GET /api/v1/product/?name=ip HTTP/1.1
Accept: application/json
Content-Type: application/json
Authorization: Bearer <jwt_token>

```
**Response:**
```json
[
  {
    "productid": "6c31f408-6bca-4bdc-b184-e9dcbbe88ae9",
    "name": "iphone 14 pro max",
    "category": "electronics",
    "description": "this is a gadget in electronics",
    "price": "200",
    "discount": "0",
    "sellerid": "21125c26-4fd4-47ad-85bc-090787e36c0e"
  },
  {
    "productid": "9ff92453-7d89-40bd-922c-363dcfba2a63",
    "name": "iphone 14 pro charger",
    "category": "electronics",
    "description": "this is a charger of iphone",
    "price": "50",
    "discount": "0.1",
    "sellerid": "21125c26-4fd4-47ad-85bc-090787e36c0e"
  }
]
```

* With using category query

**Request:**
```json
GET /api/v1/product/?category=clothes HTTP/1.1
Accept: application/json
Content-Type: application/json
Authorization: Bearer <jwt_token>

```
**Response:**
```json
[
  {
    "productid": "3854fe28-c0ee-4fc9-9a87-638fbe49d869",
    "name": "puma hat",
    "category": "clothes",
    "description": "this is a puma hat made by 100% faberic",
    "price": "50",
    "discount": "0.1",
    "sellerid": "21125c26-4fd4-47ad-85bc-090787e36c0e"
  },
  {
    "productid": "7a8ef457-3005-422a-bb51-f19cccbf81ab",
    "name": "Nike Upper",
    "category": "clothes",
    "description": "this is a upper made by 100% cotton from Nike official",
    "price": "100",
    "discount": "0.23",
    "sellerid": "21125c26-4fd4-47ad-85bc-090787e36c0e"
  }
]
```

### Add To Cart
any valid user can add product to cart

**Request:**
```json
POST /api/v1/cart HTTP/1.1
Accept: application/json
Content-Type: application/json
Authorization: Bearer <jwt_token>

{
  "productid": "3854fe28-c0ee-4fc9-9a87-638fbe49d869",
  "quantity": 1
}
```
**Response:**
```json
{
  "message": "Product Added to cart"
}
```

### Remove From Cart
remove that particular product from the cart

**Request:**
```json
DELETE /api/v1/cart/:productId HTTP/1.1
Accept: application/json
Content-Type: application/json
Authorization: Bearer <jwt_token>

```
**Response:**
```json
{
  "message": "Product removed from cart"
}
```



