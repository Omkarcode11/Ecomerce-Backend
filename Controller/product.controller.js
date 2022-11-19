let sequelizeCon = require('./../config/database.config');
let Product = require('./../model/Products');

async function createTable() {
  await sequelizeCon.sync({ force: true });
  console.log('Product Table was created');
  insertProducts();
}
async function insertPro() {
  await Product.bulkCreate([
    { name: 'Samsung Galaxy s22 Ultra', price: 120000 },
    { name: 'Nayka lips stick', price: 1000 },
    { name: 'Lenovo Yoga 4', price: 100000 },
    { name: 'Samsung refrigerator ', price: 40000 },
    { name: 'Sony Bravia', price: 80000 },
    { name: 'Iphone 13 Pro Max', price: 150000 },
    { name: 'Mi Smart Tv', price: 30000 },
    { name: 'Eye liner Sugar', price: 1200 },
  ]);
}
// createTable();

// CRUD operations
//-------------------C - Create------------
// Add multiple Product
let insertProducts = async (req, res, next) => {
  try {
    let data = req.body;
    if (data[0].name == ' ' || data == '') {
      throw new Error();
    }
    let products = await Product.bulkCreate(data);
    res.status(203).send('Added Successfully');
    res.end();
  } catch (err) {
    res.status(400).send('Error : Enter valid value');
    res.end();
  }
};
let insertProduct = async (req, res, next) => {
  try {
    let data = req.body;
    if (data.name.charAt(0) == (' ' || '') || data.price == NaN) {
      throw new Error();
    }
    await Product.create(data);
    res.status(203).send('Product was added Successfully');
    res.end();
  } catch (err) {
    res.status(400).send('Error : Enter valid value');
    res.end();
  }
};
//-------------------R - Read--------------
let getAllProducts = async (req, res, next) => {
  let allProducts = await Product.findAll();
  console.log(JSON.stringify(allProducts));
  res.write(JSON.stringify(allProducts, null, 2));
  res.end();
};
let getProductById = async (req, res, next) => {
  try {
    let id = req.params.id;
    let lastId = await Product.findOne({
      order: [['id', 'DESC']],
    });
    if (id > lastId.id && id > 0) {
      throw new Error();
    }
    let prod = await Product.findAll({
      where: {
        id: id,
      },
    });
    res.status(202).send(JSON.stringify(prod, null, 2));
    res.end();
  } catch (err) {
    res.status(400).send('Error : This id is not Valid');
    res.end();
  }
};

//-------------------U - Update ---------------
let updateProduct = async (req, res, next) => {
  try {
    let body = req.body;
    if(body.name.charAt(0) == (""||" ") || body.price == NaN ){
        throw new Error()
    }
    await Product.update(
      {
        name: body.name,
        price: body.price,
      },
      {
        where: {
          id: body.id,
        },
      }
    );
    res.status(203).send('Product is Updated');
    res.end();
  } catch (error) {
    res.status(400).send("Error : Enter valid Value")
    res.end()
  }
};
//------------------D - Delete ------------------
let deleteProduct = async (req, res, next) => {
try {
    let lastId = await Product.findOne({
        order : [['id','DESC']]
    })
    let id = req.params.id;
    if(id<0 || id>lastId.id ){
        throw new Error()
    }
    await Product.destroy({
        where: {
            id: id,
    },
  });
  res.status(202).send('Item deleted Successfully');
  res.end();
} catch (error) {
    res.status(400).send("Error : Enter Valid Id")
    res.end()
}
};

module.exports = {
  getAllProducts,
  getProductById,
  insertProducts,
  insertProduct,
  updateProduct,
  deleteProduct,
};
