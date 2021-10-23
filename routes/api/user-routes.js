const router = require('express').Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend
} = require('../../controllers/user-controller')

router
  .route('/')
  .get(getAllUsers)
  .post(createUser);

router
  .route('/:userId')
  .get(getUserById)
  .put(updateUser)
  
  router
  .route('/:userId')
  .delete(deleteUser)
  
router
  .route('/:userId/friends/:friendId')
  .put(addFriend)
  .delete(deleteFriend)

module.exports = router;