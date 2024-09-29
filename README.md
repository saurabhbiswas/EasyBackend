# Hoisted APP

## The Full Stack App is hoisted at 

http://mygablubacket.s3-website-ap-southeast-2.amazonaws.com

### It Is integrated with backend and fully functional.
Use only http as for https ,we need custom domain purcahse and SSL.[Future consideration]


# Getting Started for LOCAL  SETUP for BACKEND 

## PreRequisite

Node.js v22.9.0 should be installed

To test with Front End ,For installation Refer, https://github.com/saurabhbiswas/Easy-FrontEnd/blob/main/README.md



Install mogodb(local/cloud hoisted) and it should be running.



To install mogodb locally, refer  doc

https://www.mongodb.com/docs/manual/installation/

MongoDB Atlas Cloud instance--

https://www.mongodb.com/products/platform/atlas-database?tck=docs_server

If you prefer using a cloud-hosted MongoDB instance, follow these steps:

Sign Up for MongoDB Atlas:

MongoDB Atlas Signup

Create a New Cluster:

Choose a free tier cluster.

Select your preferred cloud provider and region.

Configure Security Settings:

Whitelist IP Address:

Allow your IP address to access the cluster.

Create a Database User:

Set up a username and password for database access.

Get the Connection String:

Click "Connect" on your cluster.

Choose "Connect your application."

Copy the provided connection string and replace <username>, <password>, and <dbname> with your credentials and desired database name.

Example:-

MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/your_db?retryWrites=true&w=majority



## ENV FILE 

In .env.development file,

1) Point to correct FRONTEND_URL to avoid CORS error

2) MONGODB_URI should be point to local /cloud hoisted mongodb instance

3) JWT_SECRET should be alteast 8 character long

4) PORT at which nestjs app runs



PORT=3001

FRONTEND_URL=http://localhost:3000

JWT_SECRET=your_jwt_secret_key

MONGODB_URI=mongodb://localhost:27017/your_db

Note:- Ensure nestjs app IP address is whitelsited in mongodb (local/cloud) setup.

## Install dependencies

In the project directory, you can run:

### `npm install`


## Run the App

### `npm start`

It runs the app at  http://localhost:3001

Swagger docs available at http://localhost:3001/api






## Backend Service Highlights

## Security Measures

Security measures implemented -CORS, helmet, throttling implementation, refresh tokens.

### CI/CD pipeline 

It is created.[.githhub/workflows/main.yml].
On each push to main,App is deployed in EC2 instance as docker image.

### Passwords and Secrets

Githhub Repository secret is used for deployment.

### Logger

Logger is added 

### Swagger
Swagger docs available at http://localhost:3001/api

