### Instruction

This is a local json server for MTL front end developer assesment.
For reference see [JSON Server](https://www.npmjs.com/package/json-server) and [JSON Server Auth](https://www.npmjs.com/package/json-server-auth) .

```bash
# clone the repo
$ git clone https://momit_mtl@bitbucket.org/momit_mtl/mtl-fe-test-be-server.git
# install dependency
$ npm install
# server will run on port 8000
$ npm start
```

### Database

Data will be stored in `db.json` file.

1. Use `users` for login and registration. Fields are -

   - fullName
   - email
   - password

2. Use `contacts` for person's information. Fields are -

   - name
   - district
   - phone
   - email

### API Endpoints

These are the endpoints you will use to build application. Responses are not included in table, please use some API client (postman,insomnia etc) to explore.

| url            | method | body                           | authorization                       |
| -------------- | ------ | ------------------------------ | ----------------------------------- |
| /register      | post   | {fullName, email, password}    |                                     |
| /login         | post   | {email, password}              |                                     |
| /contacts      | post   | {name, district, phone, email} | Authorization: Bearer `accessToken` |
| /contacts      | get    |                                | Authorization: Bearer `accessToken` |
| /contacts/`id` | get    |                                | Authorization: Bearer `accessToken` |
| /contacts/`id` | patch  |                                | Authorization: Bearer `accessToken` |
