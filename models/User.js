const { Schema, model } = require('mongoose')

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      requred: 'Please enter a username.',
      trim: true
    },
    email: {
      type: String,
      require: 'Must enter an email address.',
      unique: true,
      match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
      }
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  {
    toJSON: {
      virtuals: true
    },
    id: false
  }
);

UserSchema.virtual('friendCount').get(function() {
  if (this.friend) {
    return this.friend.length;
  } else
  return
});

const User = model('User', UserSchema)

module.exports = User