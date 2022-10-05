/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Request, Response, NextFunction } from 'express';
import { getEnvironmentVariables } from '../environments/env';
import UserDetail from '../models/User/UserAuthDetails';
import { sign } from 'jsonwebtoken';
import * as crypto from 'crypto';
export class AuthController {
  static setPassword(password: string) {
    var salt = crypto.randomBytes(16).toString('hex');
    var hash = crypto
      .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
      .toString(`hex`);

    return { hash, salt };
  }

  static validPassword(salt: string, hash: string, password: string) {
    var hashed = crypto
      .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
      .toString(`hex`);
    return hash === hashed;
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const query = req.body.query;
      const user = await UserDetail.findOne(query);
      if (!user) {
        // if user doesnot exists, create new user
        const pass = AuthController.setPassword(req.body.user.pass);
        const user = new UserDetail({
          name: req.body.user.name,
          email: req.body.user.email,
          isActive: req.body.user.isActive,
          hash: pass.hash,
          salt: pass.salt
        });
        await user.save();
        const token = sign(user.toJSON(), getEnvironmentVariables().jwt_secret);
        const userAuthData = {
          id: user._id,
          name: user.name,
          email: user.email,
          isActive: user.isActive
        };
        return res.status(200).json({
          data: {
            user: userAuthData,
            token
          },
          sucess: true
        });
      }
      if (user) {
        // if user exists, get user data
        const isValidUser = AuthController.validPassword(
          user.salt,
          user.hash,
          req.body.user.pass
        );
        if (!isValidUser)
          res.status(401).json({
            data: {},
            success: false
          });

        const token = sign(user.toJSON(), getEnvironmentVariables().jwt_secret);
        const userAuthData = {
          id: user._id,
          name: user.name,
          email: user.email,
          isActive: user.isActive
        };
        return res.status(200).json({
          data: {
            user: userAuthData,
            token
          },
          success: true
        });
      }
    } catch (err) {
      next(err);
    }
  }

  static async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const query = req.body.query;
      const users = await UserDetail.find(query);
      return res.status(200).json({
        data: users,
        success: true
      });
    } catch (err) {
      next(err);
    }
  }

  static async updateUserData(req: Request, res: Response, next: NextFunction) {
    try {
      const query = req.body.query;
      const update = req.body.update;
      const user = await UserDetail.findOneAndUpdate(query, update, {
        new: true
      });
      return res.status(200).json({
        data: user,
        success: true
      });
    } catch (err) {
      next(err);
    }
  }

  static async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const query = req.body.query;
      const user = await UserDetail.findOneAndDelete(query);
      return res.status(200).json({
        data: user,
        success: true
      });
    } catch (err) {
      next(err);
    }
  }
}
