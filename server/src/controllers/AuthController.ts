/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Request, Response, NextFunction } from 'express';
import { getEnvironmentVariables } from '../environments/env';
import UserDetail from '../models/User/UserAuthDetails';
import { sign } from 'jsonwebtoken';
import * as crypto from 'crypto';
import * as nodemailer from 'nodemailer';
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

  // static emailVerification(email: string) {
  //   var transport = nodemailer.createTransport({
  //     host: 'smtp.mailtrap.io',
  //     port: 2525,
  //     auth: {
  //       user: 'a0720bf2128650',
  //       pass: 'd3e5b5df12f257'
  //     }
  //   });

  //   const message = {
  //     from: 'shield-art-online@gmail.com',
  //     to: email,
  //     subject: 'Email Verification',
  //     text: 'Please verify your email by clicking on this link!'
  //   };
  //   transport.sendMail(message, (err, info) => {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       console.log(info);
  //     }
  //   });
  // }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const query = req.query;
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
        // AuthController.emailVerification(user.email);
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
      const query = req.query;
      const userData = await UserDetail.find(query);
      let users: any[] = [];
      userData.forEach((data) => {
        var user = {};
        if (data)
          Object.keys(data).forEach((rootKey: string) => {
            if (rootKey === '_doc') {
              // @ts-ignore
              Object.keys(data[rootKey]).forEach((key: string) => {
                if (
                  key !== 'created_at' &&
                  key !== 'updated_at' &&
                  key !== '__v'
                )
                  // @ts-ignore
                  user[key] = data[key];
              });
            }
          });
        users.push(user);
      });
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
      const query = req.query;
      const update = req.body.update;
      const userData = await UserDetail.findOneAndUpdate(query, update, {
        new: true
      });
      var user = {};
      if (userData)
        Object.keys(userData).forEach((rootKey: string) => {
          if (rootKey === '_doc') {
            // @ts-ignore
            Object.keys(userData[rootKey]).forEach((key: string) => {
              if (key !== 'created_at' && key !== 'updated_at' && key !== '__v')
                // @ts-ignore
                user[key] = userData[key];
            });
          }
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
      const query = req.query;
      const userData = await UserDetail.findOneAndDelete(query);
      var user = {};
      if (userData)
        Object.keys(userData).forEach((rootKey: string) => {
          if (rootKey === '_doc') {
            // @ts-ignore
            Object.keys(userData[rootKey]).forEach((key: string) => {
              if (key !== 'created_at' && key !== 'updated_at' && key !== '__v')
                // @ts-ignore
                user[key] = userData[key];
            });
          }
        });
      return res.status(200).json({
        data: user,
        success: true
      });
    } catch (err) {
      next(err);
    }
  }
}
