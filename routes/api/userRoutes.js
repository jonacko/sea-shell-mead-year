const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUsers,
  deleteUsers,
  addFriend,
  deleteFriend
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser);

// .put(updateUsers).delete(deleteUsers); ----- put this at end of line 16

// // Directs to: /api/users/:userId/friends/:friendId <POST, DELETE>
// router.route('/:id/friends/:friendId').post(addFriend).delete(deleteFriend)

module.exports = router;