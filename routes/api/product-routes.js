const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  try {
    const productData = await Product.findAll({
      include: [
        {
          model: Category,
        },
        {
          model: Tag,
        },
      ],
    });
    res.status(200).json(productData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// get one product
router.get('/:id', async (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  try{
    const productData = await Product.findByPk(req.params.id,{
      include: [
        {
          model: Category,
        },
        {
          model: Tag,
        },
      ],
    })
    if (!productData){
      res.status(404).json({ message: 'no product with this id'})
    }
    res.status(200).json(productData)
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'internal server error'})
  }

}); 
    

router.post('/', async (req, res) => {
  // create a new tag
  try{
    const productData = await Product.create(req.body);
    res.status(200).json(productData);
  } catch (err){
    res.status(400).json(err)
  }
});

// update product
router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try{
    const productData = await Product.update(
      {
        category_name: req.body.category_name,
        price: req.body.price,
        stock: req.body.stock,
        category_id: req.body.category_id
      },
      {
        where: {
          id: req.params.id
        }
      }
    );
    
    if (!productData){
      res.status(404).json({ message: 'No category found with this id'})
      return;
    }
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.delete('/:id', async (req, res) => {
  try{
    const productData = await Product.destroy({
        where: {
          id: req.params.id
        }
    })
    if (!productData){
      res.status(400).json({
        message: 'no tag found with this id!'
      })
      return;
    }
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
