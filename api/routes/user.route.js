import express from 'express'
import { updateUser, deleteUser, getUserListings, getUser, addUserFav, removeUserFav } from '../controllers/user.controller.js'
import { verifyToken } from '../utils/verifyUser.js'

const router = express.Router()


router.get('/test', (req, res) => {
  res.send('Hello World!')
})
router.post('/update/:id', verifyToken, updateUser)
router.post('/update/:id/addfav', verifyToken, addUserFav)
router.post('/update/:id/removefav', verifyToken, removeUserFav)


router.delete('/delete/:id', verifyToken, deleteUser)
router.get('/listings/:id', verifyToken, getUserListings)
router.get('/:id', verifyToken, getUser)


export default router