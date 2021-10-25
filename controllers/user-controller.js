const { User, Thought } = require('../models');
const { deleteUserThought } = require('./thought-controller')

const userController = {
  getAllUsers(req, res) {
    User.find({})
      .populate({
        path: 'thoughts friends', 
        select: 'thoughtText username'
      })
      .select('-__v')
      .then(dbUserData => {
        res.json(dbUserData)
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  createUser({ body }, res) {
    User.create(body)
    .then(dbUserData => res.json({message: 'The following user has been created', dbUserData}))
    .catch(err => res.status(400).json(err));
  },
  getUserById({ params }, res) {
    User.findOne(
      { _id: params.userId },
    )
      .populate({
        path: 'thoughts friends',
        select: 'username'
      })
      .select('-__v')
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this ID!'});
          return;
        }
        res.json(dbUserData)
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.userId }, body, { new: true })
      .then(dbUserData => {
        if(!dbUserData) {
          res.status(404).json({ message: 'No user found with that ID!'})
          return
        }
        res.json({message: 'The following update has been applied', dbUserData})
      })
      .catch(err => res.status(400).json(err));
  }, 
  deleteUser({ params }, res) {
    // BONUS BONUS BONUS BONUS BONUS BONUS BONUS BONUS //
    User.findOne(
      { _id: params.userId },
    )
    .then(dbUserData => {
      if(!dbUserData.thoughts) {
        return
      } else {
        dbUserData.thoughts.forEach((thoughts) => {
          deleteUserThought(thoughts._id)
        });
      }
    });

    User.findOneAndDelete(
      { _id: params.userId }
    )
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this ID!'})
        return
      }
      res.json({ message: `${dbUserData.username} and associated thoughts have been delete`})
    })
    .catch(err => {
      console.log(err)
      res.json(err)
    });
  }, 
  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $push: { friends: { _id: params.friendId } } },
      { new: true }
    )
      .populate({
        path: 'friends',
        select: 'username'
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with that ID!' });
          return
        }
        res.json({message: `${dbUserData.username} is now friends with ${dbUserData.friends[0].username}!`})
      })
      .catch(err => {
        console.log(err)
        res.json(err)
      });
  },
  deleteFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then(dbUserData => {
        res.json({ message: 'You have removed a friend' })
      })
      .catch(err => res.json(err));
  }
}

module.exports = userController;