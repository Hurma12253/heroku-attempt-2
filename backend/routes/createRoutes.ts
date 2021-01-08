import {Express} from 'express'
import {UserCtrl, AdminCtrl, ApiCtrl} from '../controllers'
import {auth} from '../middlewares/auth'

export const createRoutes = (app: Express) => {
    const UserController = new UserCtrl()
    const AdminController = new AdminCtrl()
    const ApiController = new ApiCtrl()

    app.get('/user/getMembers', auth, UserController.getMembers)
    app.post('/user/signup', UserController.signup)
    app.post('/user/signin', UserController.signin)
    app.post('/user/addmember', auth,UserController.addMember)
    app.post('/user/loginmember', auth,UserController.loginMember)
    app.post('/user/delete', auth,UserController.deleteUser)
    app.put('/user/edituser', auth,UserController.editUser)

    app.get('/admin/getallusers', auth,AdminController.getAllUsers)
    
    app.get('/randomapilist',auth, ApiController.getApiList)
}