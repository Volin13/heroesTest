const create = require("./create");
const edit = require("./edit");
const getAll = require("./getAll");
const getOne = require("./getOne");
const deleteOne = require("./delete");

const { controllerWrapper } = require("../../helpers");

module.exports = {
  create: controllerWrapper(create),
  edit: controllerWrapper(edit),
  getAll: controllerWrapper(getAll),
  getOne: controllerWrapper(getOne),
  deleteOne: controllerWrapper(deleteOne),
};
