import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { AuthSetup } from '../middlewares/authentication-setup';

// The file is responsible to process the api requests and call the required middleware, validator and controller in a centralized place

//@Route: /auth
//@AUTH not required
//@FUNCTIONS all auth related work

class AuthRouter {
  public router: Router;
  constructor() {
    this.router = Router();
    this.getRoutes();
    this.postRoutes();
    this.putRoutes();
    this.deleteRoutes();
  }
  getRoutes(): void {
    // add all get routes here
    this.router.get(
      '/', // path of api request
      AuthSetup.isAuthenticated, // checks if the request contains a valid token (checks if user is logged in. Remove this middleware if user is supposed to not be logged in).
      AuthController.getUsers // Main business logic of the server that returns the required response.
    );
  }
  postRoutes(): void {
    // add all post routes here
    this.router.post(
      '/login', // path of api request
      AuthController.login // Main business logic of the server that returns the required response.
    );
  }
  putRoutes(): void {
    // add all get routes here
    this.router.put(
      '/update', // path of api request
      AuthSetup.isAuthenticated, // checks if the request contains a valid token (checks if user is logged in. Remove this middleware if user is supposed to not be logged in).
      AuthController.updateUserData // Main business logic of the server that returns the required response.
    );
  }
  deleteRoutes(): void {
    // add all get routes here
    this.router.delete(
      '/delete', // path of api request
      AuthSetup.isAuthenticated, // checks if the request contains a valid token (checks if user is logged in. Remove this middleware if user is supposed to not be logged in).
      AuthController.deleteUser // Main business logic of the server that returns the required response.
    );
  }
}
export default new AuthRouter().router;
