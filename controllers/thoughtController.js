// based on activity 26
const { Thought, User } = require('../models');

// getThoughts method
module.exports = {
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => console.log(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  // getSingleThought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
    .select('-__v')
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No Thought with that ID' })
          : console.log(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // createThought method
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res.status(404).json({
              message: 'Thought created, but found no user with that ID',
            })
          : res.json('Created a new Thought!')
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // updateThought method
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !Thought
          ? res.status(404).json({ message: 'No Thought with this id!' })
          : res.json(thought)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // deleteThought method
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((Thought) =>
        !Thought
          ? res.status(404).json({ message: 'No Thought with this id!' })
          : User.findOneAndUpdate(
              { Thoughts: req.params.thoughtId },
              { $pull: { Thoughts: req.params.thoughtId } },
              { new: true }
            )
      )
      .then((user) =>
        !user
          ? res.status(404).json({
              message: 'Thought created but no user with this id!',
            })
          : res.json({ message: 'Thought successfully deleted!' })
      )
      .catch((err) => res.status(500).json(err));
  },
  // addReaction method
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.ThoughtId },
      { $addToSet: { Reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((Thought) =>
        !Thought
          ? res.status(404).json({ message: 'No Thought with this id!' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // deleteReaction method
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { Reactions: { ReactionId: req.params.ReactionId } } },
      { runValidators: true, new: true }
    )
      .then((Thought) =>
        !Thought
          ? res.status(404).json({ message: 'No Thought with this id!' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};