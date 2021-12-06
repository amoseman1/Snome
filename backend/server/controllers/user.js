const { get, helpers } = require('../models');
const user = require('../models/user')

module.exports = {

  createUser: async (req, res) => {
    try {
      await user.createUser(req.body);
      res.status(201).send('Success!');
    } catch(err) {
      console.log(`SERVER SIDE ERROR - POST: ${err}`);
      res.status(500).send(err);
    }
  },

  updateUser: async (req, res) => {
    try {
      await user.updateUser(req.params.id, req.body);
      res.status(202).send('Updated Successfuly');
    } catch(err) {
      console.log(`SERVER ERROR - PUT:  ${err}`);
      return err;
    }
  },

  getUser: async (req, res) => {
    try {
      let data = await user.getUser(req.params.id);
      res.status(200).send(data);
    } catch(err) {
      console.log(`SERVER ERROR: ${err}`);
      res.status(400).send(err);
    }
  },

  getAllUsers: async (req, res) => {
    try {
      let data = await user.getAllUsers();
      res.status(200).send(data);
    } catch(err) {
      console.log(`SERVER ERROR: ${err}`);
      res.status(400).send(err);
    }
  },

  checkForEmail: async (req, res) => {
    try {
      let data = await user.checkForEmail(req.body.email);
      res.status(200).send(data);
    } catch(err) {
      console.log(`SERVER ERROR: ${err}`);
      res.status(400).send(err);
    }
  }

  deleteUser: async (req, res) => {
    try {
      await user.deleteUser(req.params.id);
      res.status(202).send("User Deleted")
    } catch(err) {
      console.log(`SERVER ERROR - DELETE: ${err}`);
      res.status(400).send(err);
    }
  },

}