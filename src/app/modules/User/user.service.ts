import { JwtPayload } from 'jsonwebtoken'
import { User } from './user.model'
import { TUser } from './user.interface'

// *Get User Profile From Database
const getSingleUserFromDB = async (payload: JwtPayload) => {
  const result = await User.findOne({
    email: payload?.userEmail,
    role: payload?.role,
  })
  return result
}

// *Update a User Profile

const updateSingleUserIntoDB = async (
  userData: JwtPayload,
  payload: Partial<TUser>,
) => {
  const result = await User.findOneAndUpdate(
    { email: userData?.userEmail },
    {
      name: payload?.name,
      phone: payload?.phone,
      address: payload?.address,
    },
    {
      new: true,
    },
  )
  return result
}

export const userServices = {
  getSingleUserFromDB,
  updateSingleUserIntoDB,
}
