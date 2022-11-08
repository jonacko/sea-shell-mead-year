// based on activity 26

const { User, Thought } = require('../models');

module.exports = {
  // Get all users
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  
  // Get a single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')


      .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .populate({
        path: 'friends',
        select: '-__v'
      })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

// updateUser method
updateUser(req, res) {
  User.findOneAndUpdate(
    { _id: req.params.userId },
    { $set: req.body },
    { runValidators: true, new: true }
  )
    .then((user) =>
      !User
        ? res.status(404).json({ message: 'No User with this id!' })
        : res.json(user)
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
},

  // // Delete a user
  // deleteUser(req, res) {
  //   User.findOneAndDelete({ _id: req.params.userId })
  //     .then((user) =>
  //       !user
  //         ? res.status(404).json({ message: 'No user with that ID' })
  //         : Thought.deleteMany({ _id: { $in: user.applications } })
  //     )
  //     .then(() => res.json({ message: 'User deleted!' }))
  //     .catch((err) => res.status(500).json(err));
  // },

  // BONUS delete a user and thoughts
  //   Delete user and users associated thoughts
    deleteUser({ params }, res) {
      Thought.deleteMany({ userId: params.thoughtId })
        .then(() => {
          User.findOneAndDelete({ userId: params.userId })
            .then(dbUserData => {
              if (!dbUserData) {
                res.status(404).json({ message: 'No User found with this id' });
                return;
              }
              res.status(200).json({ message: 'User deleted!' });
            });
        })
        .catch(err => res.status(500).json(err));
    },


// create friend
// /api/users/:userid/friends/:friendId
addFriend({ params }, res) {
  User.findOneAndUpdate(
    { _id: params.userId },
    { $push: { friends: params.friendId } },
    { new: true }
  )
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => res.status(400).json(err));
},

deleteFriend({ params }, res) {
  User.findOneAndUpdate(
    { _id: params.userId },
    { $pull: { friends: params.friendId } },
    { new: true }
  )
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => res.status(400).json(err));
}};
