# Social Network API

- Challenge 18 assignment for UoB Bootcamp due 07-11-22
- Walkthrough video link: https://drive.google.com/file/d/12I9CJfawrawoWLu0wCbn6I5VZk2UuqOk/view

Contents:

1. Summary
2. Key features
3. Issues encountered/further amendments
4. Credits

## 1. Summary

This project was undertaken as a submission for a Birmingham University Bootcamp assignment, with a brief to build an API for a social network web application where users can share their thoughts, react to friends’ thoughts, and create a friend list. The task included using express.js for routing, a MongoDB database, and the Mongoose ODM.  The user story and acceptance criteria is as follows:

<img src ="images/Screenshot 2022-11-08 at 15.21.57.png">


## 2. Key features:

- Server starts and Mongoose models are syncoed to MongoDB database
- when I open API GET routes in Insomnia for users and thoughts then the data for each of these routes is displayed in a formatted JSON
- when I test API POST, PUT, and DELETE routes in Insomnia then I am able to successfully create, update, and delete users and thoughts in my database
- when I test API POST and DELETE routes in Insomnia then I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list

BONUS:

- Users associated thoughts are also removed when deleted


## 3. Issues encountered/further amendments

As far as I understand, all acceptance criteria are met.  

## 4. Credits

Using MongoDB Compass tutorial: https://www.youtube.com/watch?v=bJSj1a84I20