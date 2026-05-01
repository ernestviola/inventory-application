import pool from '../pool.js';

const categoryItem = async () => {
  try {
    const { rows } = await pool.query(
      `
      select * from category inner join item on category.id = item.category_id;
      `,
    );
    return rows;
  } catch (error) {
    console.error(error);
  }
};

export default categoryItem;
