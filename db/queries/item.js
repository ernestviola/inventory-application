import pool from '../pool.js';
const item = {};

/**
 *
 * @param {string} order optional: 'asc','desc'
 * @returns {database object}
 */
item.all = async (order = undefined) => {
  if (order && !['asc', 'desc'].includes(order))
    throw new Error(`Only accept asc and desc. Got: , ${order}`);
  try {
    const orderClause = order ? `order by name ${order.toLowerCase()}` : '';
    const result = await pool.query(` select * from item ${orderClause}`);
    return result;
  } catch (error) {
    console.error(error);
  }
};

/**
 * Find item by id
 * @param {number} id
 * @returns {database object}
 */
item.find = async (id) => {
  try {
    const result = await pool.query(`select * from item where id = $1`, [id]);
    return result;
  } catch (error) {
    console.error(error);
  }
};

/**
 *
 * @param {string} name Item name
 * @param {number} quantity
 * @param {number} price
 * @param {string} imageUrl
 * @param {number} category_id
 * @returns
 */
item.create = async (
  name,
  quantity,
  price,
  imageUrl = undefined,
  category_id = undefined,
) => {
  if (!category_id) throw new Error(`category_id is required`);

  try {
    const result = await pool.query(
      `
      insert into item 
      (name,quantity,price,imageUrl,category_id) values
      ($1,$2,$3,$4,$5)
      `,
      [name, quantity, price, imageUrl, category_id],
    );
    return result;
  } catch (error) {
    console.error(error);
  }
};

/**
 *
 * @param {integer} id id of the item
 * @param {Object} updates form of {<field-to-update> : <value>}
 * options: name,quantity,price,imageUrl,category_id,
 * @returns db object
 */
item.update = async (id, updates) => {
  const keys = Object.keys(updates);
  if (keys.length === 0) throw new Error('No fields to update');
  const setClause = keys
    .map((key, index) => `${key} = $${index + 2}`)
    .join(', ');
  const values = [id, ...Object.values(updates)];

  try {
    const result = await pool.query(
      `
      update item SET ${setClause} where id = $1
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
 * @param {integer} id id of the item
 * @returns db object
 */
item.delete = async (id) => {
  try {
    const result = await pool.query(
      `
      delete from item where id = $1`,
      [id],
    );
    return result;
  } catch (error) {
    console.error(error);
  }
};

export default item;
