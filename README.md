# Voice Chatroom (Back-End)
Back-End repo for labs11-intercomApp-BE a/k/a Voice Chatroom.

## Table of Contents
-   [Overview](#overview)
    -   [Introduction](#introduction)
    -   [Mission Statement](#mission-statement)
-   [Getting Started](#getting-started)
    -   [Install](#install)
        -   [Dependencies](#dependencies)
        -   [Dev-Dependencies](#dev-dependencies)
    -   [Test Server](#test-server)
    -   [Development Server - Start](#development-server-start)
    -   [Development Server - Continuous Run](#development-server-continuous-run)
    -   [Production Server](#production-server)
-   [Environment and Configuration Variables](#environment-and-configuration-variables)
-   [Data](#data)
    -   [Database](#database)
        -   [Test Database](#test-database)
        -   [Development Database](#development-database)
        -   [Production Database](#production-database)
    -   [Database Tables](#database-tables)
        -   [Schema](#schema)
        -   [Tables](#tables)
            -   [Users](#users-table)
            -   [Groups](#groups-table)
            -   [Group Activities](#group-activities-table)
            -   [Group Owners](#group-owners-table)
            -   [Group Members](#group-members-table)
            -   [Group Invitees](#group-invitees-table)
            -   [Group Call Participants](#group-call-participants-table)
-   [API](#api)
    -   [Endpoints and Routers](#endpoints-and-routers)
        -   [Users](#users-router)
        -   [Groups](#groups-router)
        -   [Voice](#voice-router)
        -   [Billing](#billing-router)
        -   [Image Upload](#image-upload-router)
    -   [Third Party APIs](#third-party-apis)


# Overview
Back-end Node and Express server for a React front-end application.

## Introduction
Using your phone and headphones, you will have the ability to create voice chatrooms groups, talk directly into your group’s ears, and hear others talk into your ears. You can manage the group, see who is in the group and start up a voice call.

## Mission Statement
Our mission is to assist a wide variety of users ranging from those who may be hearing impaired or elderly to anyone who finds themselves as a group having difficulty conversing with others with overbearing background noise. We provide our users to opportunity to easily create and join personal groups and initiate voice chats within those groups to keep a clear communication link with their family and friends. Don't lose your voice, find your Voice Chatroom!

# Getting Started
**Package Manager:** `yarn`
- Clone this repository and change directory into the root folder.

## Install
`yarn install`

### Dependencies 
`body-parser` `cloudinary` `cors` `datauri` `dotenv` `express` `heroku` `knex` `multer` `ngrok` `node` `pg` `sqlite3` `stripe` `twilio`
### Dev-Dependencies 
`cross-env` `jest` `nodemon` `supertest` 

## Test Server
```yarn test```  
  
Server testing completed with `jest` and `supertest`.

## Development Server (Start)
```yarn start```  
  
Configured with `node` to start server. Any changes made to server will require a stop and re-start.
- Test and run development server in program such as Postman 
- To confirm running, make a GET/ request to: `localhost:3300/`
- Will recieve confirmation message: `Hello World!`

## Development Server (Continuous Run)
```yarn server```  
  
Configured with `nodemon` to continuously run server. If no local .env file set with `PORT` variable, will default to run on port `3300`.
- Test and run development server in program such as Postman 
- To confirm running, make a GET/ request to: `localhost:3300/`
- Will recieve confirmation message: `Hello World!`

## Production Server
Our production server is deployed to Heroku using the `heroku/nodejs` buildpack.

# Environment and Configuration Variables
Environments and variables set within local .env file for testing and development. For production variables are set within the Heroku's application `Config Vars` settings.
- **Local/Production:** `DATABASE_URL` `DB_ENV`
- **Cloudinary:** `CLOUDINARY_API_KEY` `CLOUDINARY_API_NAME` `CLOUDINARY_API_SECRET`
- **Stripe:** `SK_TEST`
- **Twilio:** `ACCOUNT_SID` `API_KEY` `API_KEY_SECRET` `APP_SID` `AUTH_TOKEN` `CALLER_ID` `PUSH_CREDENTIAL_SID` `SERVICE_SID`

# Data
Database configured with `knex`. Knex configuration file, migrations and seeds located within `data` directory.

## Database

### Test Database
Testing uses sqlite3 database. `yarn test` will automatically set environment to `testing`
- Environment: `testing`
- Connect migrations to testing with command line: `knex migrate:latest --env=testing`.
- Connect seed to testing with command line: `knex seed:run --env=testing`.

### Development Database
Development uses sqlite3 database. If no local .env file set with `DB_ENV` variable, will default to run knex environment of `development`.
- Environment: `development`
- Connect migrations to development with command line: `knex migrate:latest`.
- Connect seed to development with command line: `knex seed:run`.

### Production Database
Production deployed to Heroku and uses Heroku Postgress database add-on.
- Environment: `production`
- Connect migrations to production with command line: `npx heroku run knex migrate:latest -a <<app_name>>`.
- Seeds not connected to production database.

## Database Tables

### Schema
![Schema Table](https://i.imgur.com/hMqhkJx.png)

### Tables
- **PK** = Primary Key
- **FK** = Foreign Key
- **FK Ref** = Foreign Key Reference (<<*table*>>.<<*row*>>)

#### Users Table
Table: `users`

| Name               | Data type     | PK | Unique | Not NULL | Default To  |
| -------------------|---------------|:--:|:------:|:--------:|:-----------:|
| id                 | integer       | +  | +      | +        | -           |
| email              | varchar(128)  | -  | +      | +        | -           |
| displayName        | varchar(128)  | -  | -      | +        | -           |
| firstName          | varchar(128)  | -  | -      | -        | -           |
| lastName           | varchar(128)  | -  | -      | -        | -           |
| avatar             | varchar(256)  | -  | -      | -        | *null*      |
| phoneNumber        | integer(9)    | -  | -      | -        | -           |
| callStatus         | boolean       | -  | -      | +        | *false*     |
| stripeId           | varchar(128)  | -  | -      | -        | *null*      |
| billingSubcription | varchar(128)  | -  | -      | +        | 'free'      |
| accountBalance     | integer       | -  | -      | -        | -           |
| last4              | varchar(4)    | -  | -      | -        | *null*      |
| createdAt          | timestamp     | -  | -      | -        | knex.fn(now)|

#### Groups Table
Table: `groups`

| Name               | Data type     | PK | Unique | Not NULL | Default To  |
| -------------------|---------------|:--:|:------:|:--------:|:-----------:|
| id                 | integer       | +  | +      | +        | -           |
| name               | varchar(128)  | -  | -      | +        | -           |
| phoneNumber        | varchar(12)   | -  | -      | -        | -           |
| callStatus         | boolean       | -  | -      | -        | *false*     |
| createdAt          | timestamp     | -  | -      | -        | knex.fn(now)|

#### Group Activities Table
Table: `activities`

| Name               | Data type     | PK | Unique | Not NULL | Default To  | FK | FK Ref    | Update  | Delete  |
| -------------------|---------------|:--:|:------:|:--------:|:-----------:|:--:|:---------:|:-------:|:-------:|
| id                 | integer       | +  | +      | +        | -           | -  | -         | -       | -       |
| userId             | integer       | -  | -      | +        | -           | +  | users.id  | CASCADE | CASCADE |
| groupId            | integer       | -  | -      | +        | -           | +  | groups.id | CASCADE | CASCADE |
| activity           | varchar(128)  | -  | -      | +        | -           | -  | -         | -       | -       |
| createdAt          | timestamp     | -  | -      | -        | knex.fn(now)| -  | -         | -       | -       |

#### Group Owners Table
Table: `usersGroupsOwnership`

| Name               | Data type     | Default To  | FK | FK Ref    | Delete  |
| -------------------|---------------|:-----------:|:--:|:---------:|:-------:|
| userId             | integer       | -           | +  | users.id  | CASCADE |
| groupId            | integer       | -           | +  | groups.id | CASCADE |
| createdAt          | timestamp     | knex.fn(now)| -  | -         | -       |

#### Group Members Table
Table: `usersGroupsMembership`

| Name               | Data type     | Default To  | FK | FK Ref    | Delete  |
| -------------------|---------------|:-----------:|:--:|:---------:|:-------:|
| userId             | integer       | -           | +  | users.id  | CASCADE |
| groupId            | integer       | -           | +  | groups.id | CASCADE |
| createdAt          | timestamp     | knex.fn(now)| -  | -         | -       |

#### Group Invitees Table
Table: `usersGroupsInvitations`

| Name               | Data type     | Default To  | FK | FK Ref    | Delete  |
| -------------------|---------------|:-----------:|:--:|:---------:|:-------:|
| userId             | integer       | -           | +  | users.id  | CASCADE |
| groupId            | integer       | -           | +  | groups.id | CASCADE |
| createdAt          | timestamp     | knex.fn(now)| -  | -         | -       |

#### Group Call Participants Table
Table: `usersGroupsParticipants`

| Name               | Data type     | Default To  | FK | FK Ref    | Delete  |
| -------------------|---------------|:-----------:|:--:|:---------:|:-------:|
| userId             | integer       | -           | +  | users.id  | CASCADE |
| groupId            | integer       | -           | +  | groups.id | CASCADE |
| createdAt          | timestamp     | knex.fn(now)| -  | -         | -       |


# API
All server routers and models located within `api` directory.

## Endpoints and Routers
Server and routers configured with `express`.

| Main Routers | Endpoint       |
| -------------|----------------|
| Users        | `/api/users`   |
| Groups       | `/api/groups`  |
| Voice        | `/api/voice`   |
| Billing      | `/api/billing` |
| Image Upload | `/api/upload`  |

### Users Router
User routers and models located within `api/users` directory.

| Endpoint                           | Method | Request             | Response                                                         |
|------------------------------------|--------|---------------------|------------------------------------------------------------------|
| `/api/users`                       | GET    |                     | List of all users                                                |
| `/api/users`                       | POST   | Send User Info      | Adds user to database (if new). Returns user's ID & information. | 
| `/api/users/:id`                   | GET    |                     | All user information by specified ID                             | 
| `/api/users/:id`                   | PUT    | Send Needed Changes | Updates user and returns all user information by specified ID    |
| `/api/users/:id`                   | DELETE |                     | Deletes all user's activities, then Deletes user. Returns count. |
| `/api/users/:id/detailed`          | GET    |                     | All user information by specified ID with user's groups owned, groups belonged to, and groups invited to. Each group returned also returns that group's information with call participants, activities, owners, members, and invitees of each group. |
| `/api/users/:id/accountBalance`    | GET    |                     | User's account balance information                               |
| `/api/users/:id/accountBalance`    | PUT    | Send New Balance    | Updates user's account balance and returns user                  |
| `/api/users/:id/last4`             | GET    |                     | User's last four digits of credit card                           |
| `/api/users/:id/last4`             | PUT    | Send New Card Info  | Updates user's last four digits of credit card and returns user  |
| `/api/users/:id/groupsOwned`       | GET    |                     | List of all groups that user owns                                | 
| `/api/users/:id/groupsBelongedTo`  | GET    |                     | List of all groups that user is a member of                      |
| `/api/users/:id/groupsInvitedTo`   | GET    |                     | List of all groups that user is invited to                       |

### Groups Router
Groups routers and models located within `api/groups` directory.

| Endpoint                                 | Method | Request              | Response                                                         |
|------------------------------------------|--------|----------------------|------------------------------------------------------------------|
| `/api/groups`                            | GET    |                      | List of all groups                                               |
| `/api/groups`                            | POST   | Send Group Info      | Adds group to database. Returns group ID & information.          | 
| `/api/groups/:id`                        | GET    |                      | All group information by specified ID                            | 
| `/api/groups/:id`                        | PUT    | Send Needed Changes  | Updates group and returns all group information by specified ID  |
| `/api/groups/:id`                        | DELETE |                      | Deletes group by specified ID. Returns count.                    |
| `/api/groups/:id/activities`             | GET    |                      | List of all activities for specified group ID                    |
| `/api/groups/:id/activities`             | POST   | Send Activity Info   | Adds activity to database. Returns list of all group activities. |
| `/api/groups/:id/callParticipants`       | GET    |                      | List of all call participants for specified group ID             |
| `/api/groups/:id/callParticipants`       | POST   | Send User Info       | Adds participant to database. Returns list of call participants. |
| `/api/groups/:id/callParticipants`       | DELETE |                      | Deletes all call participants for specified group. Returns count.|
| `/api/groups/:id/callParticipants/:id`   | DELETE |                      | Deletes call participant by specified user ID and group ID. Returns updated list of call participants for group. |
| `/api/groups/:id/callStatus`             | GET    |                      | Group's current call status                                      | 
| `/api/groups/:id/callStatus`             | PUT    | Send New Call Status | Updates group call status and returns all group information      |
| `/api/groups/:id/groupOwners`            | GET    |                      | List of all group owners                                         | 
| `/api/groups/:id/groupOwners`            | POST   | Send User Info       | Adds group owner to database. Returns list of group owners.      |
| `/api/groups/:id/groupOwners/detailed`   | GET    |                      | List of all group owners with detailed user information          | 
| `/api/groups/:id/groupOwners/:id`        | DELETE |                      | Deletes group owner by specified user ID and group ID. Returns updated list of group owners. |
| `/api/groups/:id/groupMembers`           | GET    |                      | List of all group members                                        |
| `/api/groups/:id/groupMembers`           | POST   | Send User Info       | Adds group member to database. Returns list of group members.    |
| `/api/groups/:id/groupMembers/detailed`  | GET    |                      | List of all group members with detailed user information         | 
| `/api/groups/:id/groupMembers/:id`       | DELETE |                      | Deletes group member by specified user ID and group ID. Returns updated list of group members. |
| `/api/groups/:id/groupInvitees`          | GET    |                      | List of all group invitees                                       |
| `/api/groups/:id/groupInvitees`          | POST   | Send User Info       | Adds group invitee to database. Returns list of group invitees.  |
| `/api/groups/:id/groupInvitees/detailed` | GET    |                      | List of all group invitees with detailed user information        | 
| `/api/groups/:id/groupInvitees/:id`      | DELETE |                      | Deletes group invitee by specified user ID and group ID. Returns updated list of group invitees. |

### Voice Router
Voice router, model and handler functions located within `api/voice` directory. Voice handler functions implemented with Twilio, a third-party communications API. 

| Endpoint                     | Method | Response                                                                                                           |
|------------------------------|--------|--------------------------------------------------------------------------------------------------------------------|
| `/api/voice/accessToken`     | GET    | Validates a user with Twilio API to generate an Access Token for user to make or join calls.                       |
| `/api/voice/makeCall`        | POST   | Retrieves the group ID that a user is attempting to chat with and initiates the process to start or join the call. |
| `/api/voice/registerBinding` | POST   | Generates device-specific address Twilio will use to send notifications                                            |
| `/api/voice/sendNotification`| POST   | Sends notiifications to users                                                                                      |

### Billing Router
Voice router and handler functions located within `api/billing` directory. Handler functions implemented with Stripe, a third-party billing API.

| Endpoint                                     | Method | Request                                           | Response                                                                                                           |
|----------------------------------------------|--------|---------------------------------------------------|--------------------------------------------------------------------------------------------------------------------|
| `/api/billing/addMoney`                      | POST   | Send User ID and Amount to Add                    | Adds charge to user's Stripe account, updates user's account balance in database. Returns updated account balance. |
| `/api/billing/allTwilioCharges`              | GET    |                                                   | Retrieves total Twilio charges in our account                                                                      |
| `/api/billing/attachSourceToCustomer`        | POST   | Send User Stripe ID and Source ID                 | Attaches credit card to user's Stripe account                                                                      |
| `/api/billing/createCharge`                  | POST   | Send User Stripe ID, Source ID, and Amount to Add | Adds charge to user's Stripe account. Returns Stripe details as to charge.                                         |
| `/api/billing/groupTwilioCharges`            | POST   | Send Group ID                                     | Retrieves total Twilio charges for sepcified group                                                                 |
| `/api/billing/retrieveCustomerDefaultSource` | POST   | Send User Stripe ID                               | Retrieves user's Stripe source and credit card information                                                         |
| `/api/billing/updateCreditCard`              | POST   | Send User ID and Source                           | Updates database with user's new source ID and credit card information. Returns updated information.               |
| `/api/billing/updateDefaultSource`           | POST   | Send User Stripe ID and Source ID                 | Updates user's Stripe account with nre source and credit card information. Returns updated information.            |
| `/api/billing/userStripeCharges`             | POST   | Send User Stripe ID                               | Retrives total charges on user's Stripe account                                                                    |

### Image Upload Router
Image upload router and handler functions located within `api/upload` directory. Handler functions implemented with Cloudinary, a third-party cloud-based image management application.

| Endpoint      | Method | Request         | Response                                          |
|---------------|--------|-----------------|---------------------------------------------------|
| `/api/upload` | POST   | Send Image File | Uploads image to Cloudinary. Returns image's url. |


## Third Party APIs
* [Cloudinary](https://cloudinary.com/){:target="_blank" rel="noopener"}: Used to store user profile images.
* [Stripe](https://stripe.com/){:target="_blank" rel="noopener"}: Used for billing implementation.
* [Twilio](https://www.twilio.com/){:target="_blank" rel="noopener"}: Used for voice chat implementation.
