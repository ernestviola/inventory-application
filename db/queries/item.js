import pool from '../pool.js';

const item = {};

item.create = async (
  name,
  quantity = null,
  price = null,
  imageUrl = null,
  category_id,
) => {
  if (name === null || category_id === null) return;
  const result = await pool.query(
    `insert into items
    (name,quantity,price,imageUrl,category_id) VALUES
    ($1,$2,$3,$4,$5)`,
    [name, quantity, price, imageUrl, category_id],
  );
  console.log(result);
  return result;
};

export default item;
