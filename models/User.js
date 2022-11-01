// Require Mongoose
const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        // use regex to validate email:
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thoughts'
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }]
    },
    {
    toJSON: {
        virtuals: true,
        getters: true,
    },
    id: false
    }
)

// Create a virtual property `friendCount' that gets the amount of friends associated with a user
userSchema
  .virtual('friendCount')
  // Getter
  .get(function () {
    return this.friends.length;
  });

// create the Users model using the Users Schema
const Users = model('Users', userSchema);

// Export Users module
module.exports = Users;