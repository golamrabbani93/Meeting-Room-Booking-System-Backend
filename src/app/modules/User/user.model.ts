import bcrypt from 'bcrypt'
import { TUser, UserModel } from './user.interface'
import { Schema, model } from 'mongoose'
import config from '../../config'

const UserSchema = new Schema<TUser, UserModel>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      // eslint-disable-next-line no-useless-escape
      match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [4, 'Password Must be 4 Charecter or more'],
      select: 0,
    },
    phone: {
      type: String,
      required: [true, 'Phobe Number is required'],
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      required: [true, 'User Role is required'],
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password
        return ret
      },
    },
    toObject: {
      transform: function (doc, ret) {
        delete ret.password
        return ret
      },
    },
  },
)

// * password hash with bcrypt
UserSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  )

  next()
})

UserSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await User.findOne({ email }).select('+password')
}

UserSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword)
}

// * Create User Model
export const User = model<TUser, UserModel>('User', UserSchema)
