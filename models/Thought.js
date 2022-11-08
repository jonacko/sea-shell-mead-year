const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

// Schema to create Thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      min_length: 1,
      max_length: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
      },
      username: {
        type: String,
        required: true,
      },
      // Array of nested documents created with the reactionSchema
      reactions: [reactionSchema],
    },
    {
      toJSON: {
        getters: true,
      },
      id: false,
  }
)

// // Create a virtual property `reactionCount' that retrieves the length of the thought's reactions array field on query.
// // thoughtSchema
//   .virtual('reactionCount')
// //   // Getter
//   .get(function () {
//     return this.reactions.length;
//   });

const Thought = model('Thoughts', thoughtSchema);

module.exports = Thought;