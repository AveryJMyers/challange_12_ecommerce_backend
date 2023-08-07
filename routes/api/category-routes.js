const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const productData = await Product.findAll();
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
      productData = await Product.findbypk(req.params.id, {
        include: [{model: Product}]
      });
    if (!productData){
      res.status(404).json({ message: 'No product found with this id!' });
      return;
    }
    res.status(200).json(productData)
  } catch (err) {
    res.status(500).json(err);
    }
})


router.post('/', async (req, res) => {
  // create a new category
  try {
    const productData = await Product.create(req.body);
    res.status(200).json(productData);
  } catch (err){
    res.status(400).json(err)
  }

});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try{
    const productData = await Product.update({
      where: {
        id: req.params.id
      }
    })
    if (!productData){
      res.status(404).json({ message: 'No product found with this id'})
      return;
    }
    res.status(200).json(locationData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try{
    const productData = await Product.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!productData){
      res.status(404).json({ message: 'No product found with this id'})
      return;
    }
    res.status(200).json(locationData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
