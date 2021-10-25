const { json } = require('express');
const { Thought, User } = require('../models');

const thoughtController = {
  getThoughts(req, res) {
    Thought.find({})
    .populate({
      path: 'users',
      select: '-__v'
    })
    .select('-__v')
    .then(dbThoughtData => res.json(dbThoughtData))
    .catch(err => {res.json(err)})
  },
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.thoughtId})
    .then(dbThoughtData => {
      if (!dbThoughtData) {
        res.status(404).json({ message: 'No thought found with this ID!'});
        return
      }
      res.json(dbThoughtData)
    })
    .catch(err => {
      console.log(err)
      res.json(err)
    });
  },
  addThought({ params, body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { thoughts: _id } },
          { new: true, runValidators: true }
        );
      })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No User found with that ID!'});
          return;
        }
        res.json({message: 'The following thought has been created', dbThoughtData});
      })
      .catch(err => {
        console.log(err);
        res.json(err);
      })
  },
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      body,
      { new: true, runValidators: true }
    )
    .then(dbThoughtData => {
      if (!dbThoughtData) {
        res.status(404).json({ message: 'No thought found with this ID!'});
        return
      }
      res.json({message: 'The following update has been applied', dbThoughtData})
    })
    .catch(err => {
      console.log(err)
      res.json(err)
    });
  },
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
    .then(dbThoughtData => {
      if (!dbThoughtData) {
        res.status(404).json({ message: 'No Thought found with that ID!'});
        return;
      }
      res.json({ message: 'Thought has been deleted' });
    })
    .catch(err => {
      console.log(err);
      res.json(err);
    });
  },
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
    .then(dbThoughtData => {
      if (!dbThoughtData) {
        res.status(404).json({ message: 'No thought found with this ID!'});
        return
      }
      res.json({message: 'The following reaction has been created', dbThoughtData})
    })
    .catch(err => res.json(err));
  },
  deleteReaction({ params }, res) {
    console.log(params.reactionId)
    Thought.findOneAndUpdate(
      { _id : params.thoughtId },
      { $pull: {reactions: { _id: params.reactionId } } },
      { $new: true }
    )
    .then(dbThoughtData => {
      if (!dbThoughtData) {
      res.status(404).json({ message: 'No reaction found by that ID'});
        return;
      }
      res.json({ message: 'Reaction has been removed' });
    })
    .catch(err => {
      console.log(err);
      res.json(err);
    });
  },
  deleteUserThought(thoughtId , res) {
    console.log(thoughtId)
    Thought.deleteOne(
      { _id: thoughtId }
    ).then(dbUserData => {
      console.log(dbUserData)
    })
  }
}

module.exports = thoughtController;