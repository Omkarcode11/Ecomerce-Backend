let Category = require('../model/Category');
let sequelizeCon = require('../config/database.config');

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
  let body = req.body;
  await Category.bulkCreate(body);
  res.status(203).send('Categories Added Successfully');
  res.end();
};

// adding single category
let insertCategory = async (req, res, next) => {
  let body = req.body;
  await Category.create(body);
  res.status(203).send('Category added Successfully');
  res.end();
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
  let id = req.params.id;
  let cat = await Category.findAll({
    where: {
      id: id,
    },
  });
  res.status(201).send(JSON.stringify(cat, null, 2));
  res.end();
};

//----------------U => Update ----------------------------------

let updateCategories = async (req, res, next) => {
  let body = req.body;
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
};

//--------------- D => Delete -----------------------------------
let deleteCategories = async (req, res, next) => {
  let id = req.params.id;
  await Category.destroy({
    where: {
      id: id,
    },
  });
  res.status(202).send('Delete Successfully');
  res.end();
};

module.exports = {
  getAllCategories,
  getCategoryById,
  insertCategory,
  insertCategories,
  updateCategories,
  deleteCategories,
};
