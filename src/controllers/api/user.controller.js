import { userService } from "../../services/user.service.js";

export class userController {
  static async getUsers(req, res) {
    try {
      const response = await userService.getUsers();
      res.status(200).json({
        status: "SUCCESS",
        data: response,
      });
    } catch (error) {
      res.status(400).json({
        status: "ERROR",
        message: error,
      });
    }
  }

  static async getUsersDto(req, res) {
    try {
      const users = await userService.getUsersDTO();
      res.status(200).json({
        status: "SUCCESS",
        data: users,
      });
    } catch (error) {
      res.status(400).json({
        status: "ERROR",
        message: error,
      });
    }
  }

  static async getUser(req, res) {
    try {
      const response = await userService.getUser(req.params.id);
      if (response.error) {
        userController.handleError(res, response.message);
        return;
      }
      res.status(200).json({
        status: "SUCCESS",
        data: response,
      });
    } catch (error) {
      res.status(400).json({
        status: "ERROR",
        message: error,
      });
    }
  }

  static async getUserAuthenticated(req, res) {
    try {
      const response = await userService.getUserAuthenticated({
        _id: req.user._id,
      });
      res.status(200).json({
        status: "SUCCESS",
        data: response,
      });
    } catch (error) {
      res.status(400).json({
        status: "ERROR",
        message: error,
      });
    }
  }

  static async saveUser(req, res) {
    try {
      const response = await userService.saveUser(req.body);
      res.status(200).json({
        status: "SUCCESS",
        data: response,
      });
    } catch (error) {
      res.status(400).json({
        status: "ERROR",
        message: error,
      });
    }
  }

  static async deleteUser(req, res) {
    try {
      const user = await userService.getUser(req.params.id);
      if (user.error) {
        userController.handleError(res, response.message);
        return;
      }
      const response = await userService.deleteUser(req.params.id);
      res.status(200).json({
        status: "SUCCESS",
        data: response,
      });
    } catch (error) {
      res.status(400).json({
        status: "ERROR",
        message: error,
      });
    }
  }

  static handleError(res, message) {
    res.status(400).json({
      status: "ERROR",
      message: message,
    });
  }
}
