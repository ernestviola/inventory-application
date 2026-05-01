const indexController = {};
import categoryItem from '../db/queries/categoryItem.js';

indexController.get = async (req, res) => {
  const rows = await categoryItem();
  res.render('index', { rows: rows });
};

export default indexController;
