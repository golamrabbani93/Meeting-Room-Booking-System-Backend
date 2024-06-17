import { Request, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import { userServices } from './user.service'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'

// *Get Single User Profile
const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const userData = req.user
  const result = await userServices.getSingleUserFromDB(userData)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User profile retrieved successfully',
    data: result,
  })
})

// *Upadte user Profile

const updateSingleUser = catchAsync(async (req: Request, res: Response) => {
  const userData = req.user
  const updatedData = req.body
  const result = await userServices.updateSingleUserIntoDB(
    userData,
    updatedData,
  )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile updated successfully',
    data: result,
  })
})

export const userControllers = {
  getSingleUser,
  updateSingleUser,
}
