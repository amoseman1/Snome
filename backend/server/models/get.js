const db = require('../../database');

/* define model queries for get requests here */

module.exports = {
  getAll: async (model, query_params) => {
    try {
      //http://vitaly-t.github.io/pg-promise/Database.html#manyOrNone
      //if there are query parameters (eg. http://localhost:3000/snome?=featured)
      if (Object.keys(query_params).length !== 0) {
        let filter = Object.keys(query_params)[0]
        let value = query_params[filter]
        var result = await db.manyOrNone(`SELECT * FROM ${model} WHERE ${filter} = ${value};`);
      }
      else {
        var result = await db.manyOrNone(`SELECT * FROM ${model};`);
        console.log(result)
      }
      return result;
    } catch (err) {
      console.log(`DATABASE ERROR: ${err}`);
      return err;
    }
  },

  getOne: (id, model) => {
    let result = db.one(`SELECT * FROM ${model} WHERE id=${id}`);
    return result;
  },

  getUser: async (id) => {
    try {
      let result = await db.one(`SELECT * FROM snome_user WHERE id =${id}`);
      return result;
    } catch (err) {
      console.log(`DATABASE ERROR:  ${err}`);
      return err;
    }
  },

  getAllUsers: async () => {
    try {
      let result = await db.manyOrNone('SELECT * FROM snome_user');
      return result;
    } catch (err) {
      console.log(`DATABASE ERROR: ${err}`);
      return err;
    }
  },

  // for navbar - to alert user when their property has been liked //
  getUnreadLikes: async (snome_user_id) => {
    try {
      let result = await db.manyOrNone(`
      SELECT COUNT (id)
      FROM snome_like
      WHERE snome_id IN (SELECT id FROM snome WHERE owner_id = ${snome_user_id})
      AND has_been_read = false;
      `);
      return result
    } catch (err) {
      console.log(`DATABASE ERROR - POST: ${err}`);
      return err;
    }
  },

  getSnomeReviews: async (snome_id) => {
    try {
      let result = await db.manyOrNone(`
        SELECT snome_user.id, name, user_photo, location_id, review.* FROM snome_user
        JOIN review ON snome_user.id=review.snome_user_id
        WHERE review.snome_id=${snome_id}`
      );
      return result;
    } catch (err) {
      console.log(`DATABASE ERROR - GET: ${err}`);
      return err;
    }
  },

  getSnomeByLocationId: async (location_id) => {
    try {
      let result = await db.manyOrNone(`SELECT * FROM snome WHERE location_id = ${location_id}`)
      return result;
    }
    catch (err) {
      console.log(`DATABASE ERROR - GET: ${err}`);
      return err;
    }

  },

  getFeaturedLocation: async () => {
    try {
      let result = await db.manyOrNone(`select url, location_id, name, longitude, latitude 
      from location_media inner join location on location_media.location_id = location.id where featured = true order by location_id`)
      return result;
    }
    catch (err) {
      console.log(`DATABASE ERROR - GET: ${err}`);
      return err;
    }
  },

  getSnomePhotos: async (snome_id) => {
    try {
      let result = await db.manyOrNone(`SELECT url FROM snome_photo WHERE snome_id = ${snome_id}`)
      return result;
    }
    catch (err) {
      console.log(`DATABASE ERROR - GET: ${err}`);
      return err;
    }

  }

};