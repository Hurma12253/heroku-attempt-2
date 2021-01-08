import {Express} from 'express'
import {UserCtrl, AdminCtrl, ApiCtrl} from '../controllers'
import {auth} from '../middlewares/auth'

export const createRoutes = (app: Express) => {
    const UserController = new UserCtrl()
    const AdminController = new AdminCtrl()
    const ApiController = new ApiCtrl()

    app.use(auth)

    app.get('/user/getMembers', UserController.getMembers)
    app.post('/user/signup', UserController.signup)
    app.post('/user/signin', UserController.signin)
    app.post('/user/addmember', UserController.addMember)
    app.post('/user/loginmember', UserController.loginMember)
    app.post('/user/delete', UserController.deleteUser)
    app.put('/user/edituser', UserController.editUser)

    app.get('/admin/getallusers', AdminController.getAllUsers)
    
    app.get('/randomapilist', ApiController.getApiList)
}