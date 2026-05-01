import pool from '../pool.js';

const categoryItem = async () => {
  try {
    const { rows } = await pool.query(
      `
      select 
        c.id as category_id, 
        c.name as category_name,
        i.name as item_name,
        i.quantity as item_quantity,
        i.price as item_price,
        i.imageurl as item_imageurl
      from category c 
      inner join item i on c.id = i.category_id 
      order by c.name, i.name;
      `,
    );
    return rows;
  } catch (error) {
    console.error(error);
  }
};

export default categoryItem;
