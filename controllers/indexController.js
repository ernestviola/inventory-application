const indexController = {};
import categoryItem from '../db/queries/categoryItem.js';

// [
//   {
//     category_id: 7,
//     category_name: 'new category',
//     item_name: 'what',
//     item_quantity: 2,
//     item_price: 2,
//     item_imageurl: null
//   }
// ]

indexController.get = async (req, res) => {
  const rows = await categoryItem();
  const categoryObject = {};
  rows.forEach((row) => {
    if (!categoryObject[row.category_id]) {
      // create the new category
      categoryObject[row.category_id] = {
        category_name: row.category_name,
        category_id: row.category_id,
        items: [],
      };
    }

    categoryObject[row.category_id].items.push({
      item_name: row.item_name,
      item_quantity: row.item_quantity,
      item_price: row.item_price,
      item_imageurl: row.item_imageurl,
    });
  });

  const categoryArray = Object.keys(categoryObject).map((key) => {
    return categoryObject[key];
  });
  categoryArray.sort((a, b) => {
    if (a.category_name < b.category_name) return -1;
    else return 1;
  });

  categoryArray.forEach((category) => {
    category.items.sort((a, b) => {
      if (a.category_name < b.category_name) return -1;
      else return 1;
    });
  });
  console.log(categoryArray);
  res.render('index', { rows: categoryArray });
};

export default indexController;
