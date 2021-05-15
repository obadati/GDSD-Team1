1. Install node.js

2. Run npm install in project.

3. Make config folder in root directory and add file `config.js` add this code

{
  "development": {
    "username": "root",
    "password": "",
    "database": "dev_db",
    "host": "localhost",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": "",
    "database": "",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}

4. In assests folder add folder `uploads` and in uploads folder add another folder named as `propertyImage` 

5. After that run the project `npm start main.js`.


