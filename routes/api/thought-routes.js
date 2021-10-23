const router = require('express').Router();
const {
  getThoughts,
  getThoughtById,
  addThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction
} = require('../../controllers/thought-controller');

router
  .route('/:userId')
  .put(addThought)

router
  .route('/')
  .get(getThoughts)

router
  .route('/:thoughtId')
  .get(getThoughtById)
  .delete(deleteThought)
  .put(updateThought)
  
router
  .route('/:thoughtId/reactions')
  .post(addReaction)

router
  .route('/:thoughtId/reactions/:reactionId')
  .delete(deleteReaction)

module.exports = router;