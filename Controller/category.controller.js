let Category = require('../model/Category');
let sequelizeCon = require('../config/database.config');
const { Error } = require('sequelize');

async function createTable() {
  await sequelizeCon.sync({ force: true });
  console.log('Category Table was Created');
  //   insertCategories();
}

async function insertCategoies() {
  await Category.bulkCreate([
    { name: 'Fashion' },
    { name: 'Electronics' },
    { name: 'Smart phone' },
    { name: 'Appliance' },
  ]);
}
// createTable()

//CRUD Operations

//---------------C  => Create---------------------
// adding multiple Categories
let insertCategories = async (req, res, next) => {
  try {
    let body = req.body;
    if (body == ' ') {
      throw new Error();
    }
    await Category.bulkCreate(body);
    res.status(203).send('Categories Added Successfully');
    res.end();
  } catch (err) {
    res.status(400).send('Error : Enter Right Value');
    res.end();
  }
};

// adding single category
let insertCategory = async (req, res, next) => {
  try {
    let body = req.body;
    if (body.name == ' ') {
      throw new Error();
    }
    await Category.create(body);
    res.status(203).send('Category added Successfully');
    res.end();
  } catch (err) {
    res.status(400).send('Error : Enter Right Value');
  }
};
//--------------------------------------------------------------

// ----------------R => Read ---------------------------
let getAllCategories = async (req, res, next) => {
  let allCat = await Category.findAll({
    order: [
      ['id', 'ASC'], // Sorts by  id in ascending order
    ],
  });
  res.write(JSON.stringify(allCat, null, 2));
  res.end();
};
let getCategoryById = async (req, res, next) => {
  let lastId = await Category.findOne({
    order: [['id', 'DESC']],
  });
  try {
    let id = req.params.id;
    let cat = await Category.findAll({
      where: {
        id: id,
      },
    });
    if (id > lastId.id) {
      throw new Error('Not Fount');
    } else {
      console.log(typeof cat);
      res.status(201).send(JSON.stringify(cat, null, 2));
      res.end();
    }
  } catch (err) {
    res.status(400).send('Error Category not Found');
    res.end();
  }
};

//----------------U => Update ----------------------------------

let updateCategories = async (req, res, next) => {
  try {
    let body = req.body;
    if (body.name == '' || body.id == NaN) {
      throw new Error();
    }
    await Category.update(
      {
        name: body.name,
      },
      {
        where: {
          id: body.id,
        },
      }
    );
    res.status(202).send('Category was Updated');
    res.end();
  } catch (err) {
    res.status(202).send('Error Something is Missing in JSON ');
    res.end();
  }
};

//--------------- D => Delete -----------------------------------
let deleteCategories = async (req, res, next) => {
    try{
   let lastId = await Category.findOne({
      order: [['id', 'DESC']],
    });
  let id = req.params.id;
  if(id>lastId.id){
    throw new Error()
  }
  await Category.destroy({
    where: {
      id: id,
    },
  });
  res.status(202).send('Delete Successfully');
  res.end();
} catch(err){
    res.status(400).send("Error : This Id is not in list")
    res.end()
}
};

module.exports = {
  getAllCategories,
  getCategoryById,
  insertCategory,
  insertCategories,
  updateCategories,
  deleteCategories,
};
