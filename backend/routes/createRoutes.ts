import {Express} from 'express'
import {UserCtrl, AdminCtrl} from '../controllers'
import {auth} from '../middlewares/auth'

export const createRoutes = (app: Express) => {
    const UserController = new UserCtrl()
    const AdminController = new AdminCtrl()

    app.use(auth)

    app.get('/user/getMembers', UserController.getMembers)
    app.post('/user/signup', UserController.signup)
    app.post('/user/signin', UserController.signin)
    app.post('/user/addmember', UserController.addMember)
    app.post('/user/loginmember', UserController.loginMember)
    app.put('/user/edituser', UserController.editUser)
    app.delete('/user/delete', UserController.deleteUser)

    app.get('/admin/getallusers', AdminController.getAllUsers)
}