import pool from '../pool.js';
const category = {};

/**
 *
 * @param {string} order optional: 'asc','desc'
 * @returns {database object}
 */
category.all = async (order = undefined) => {
  if (!['asc', 'desc'].includes(order))
    throw new Error('Only accept asc and desc. Got: ', order);
  try {
    const result = await pool.query(
      `
        select * from category ${!order ? '' : order.toLowerCase() === 'asc' ? 'order by asc' : 'order by desc'}
        `,
    );
    return result;
  } catch (error) {
    console.error(error);
  }
};

/**
 *
 * @param {*} id
 * @returns {database object}
 */
category.find = async (id) => {
  try {
    const result = await pool.query(
      `
      select * from category where id = $1
      `,
      [id],
    );
    return result;
  } catch (error) {
    console.error(error);
  }
};

/**
 *
 * @param {string} name name of the category
 * @param {string} imageUrl URL containing the image
 */
category.create = async (name, imageUrl = undefined) => {
  try {
    const result = await pool.query(
      `
      insert into category (name,imageUrl) values
      ($1,$2)
      `,
      [name, imageUrl],
    );
    return result;
  } catch (error) {
    console.error(error);
  }
};

/**
 *
 * @param {integer} id id of the category
 * @param {Object} updates form of {<field-to-update> : <value>}
 * @returns db object
 */
category.update = async (id, updates) => {
  const keys = Object.keys(updates);
  if (keys.length === 0) throw new Error('No fields to update');
  const setClause = keys
    .map((key, index) => `${key} = $${index + 2}`)
    .join(', ');
  const values = [id, ...Object.values(updates)];

  try {
    const result = await pool.query(
      `
      update category SET ${setClause} where id = $1
      `,
      values,
    );
    return result;
  } catch (error) {
    console.error(error);
  }
};

/**
 *
 * @param {integer} id id of the category
 * @returns db object
 */
category.delete = async (id) => {
  try {
    const result = await pool.query(
      `
      delete from category where id = $1`,
      [id],
    );
    return result;
  } catch (error) {
    console.error(error);
  }
};

export default category;
