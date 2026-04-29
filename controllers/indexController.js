const indexController = {};

indexController.get = (req, res) => {
  res.render('index');
};

export default indexController;
