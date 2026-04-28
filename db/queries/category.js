import pool from '../pool.js';
const category = {};

/**
 *
 * @param {string} order optional: 'asc','desc'
 * @returns {database object}
 */
category.all = (order = null) => {
  try {
    const orderBy = !order
      ? ''
      : order.toLowerCase() === 'asc'
        ? 'order by asc'
        : 'order by desc';

      const result = await pool.query(
        `
        select * from categories $1
        `,
        orderBy,
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
category.find = (id) => {
  try{
    const result = pool.query(
      `
      select * from categories where id = $1
      `,
      [id],
    );
    return result;
  }catch(error) {
    console.error(error);
  }
;}

category.create = (name, imageUrl = null) => {
  try {
    const result = pool.query(`
      insert into categories (name,imageUrl) values
      ($1,$2)
      `,[name,imageUrl])
  } catch (error) {
    console.error(error)
  }
};

category.update = (id,name,imageUrl) => {
  try {
    const result = pool.query(`
      update categories
      set`)
  }
};

category.delete = (id) => {};

export default category;
