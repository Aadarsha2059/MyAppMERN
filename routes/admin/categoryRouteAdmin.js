const express = require('express');
const router = express.Router();
// const {createCategory} = require('../../controllers/admin/categorymanagement');
const categoryController = require('../../controllers/admin/categorymanagement');
// can be implemented using single import

// implement using dot function
router.post('/', categoryController.createCategory);
router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);
router.put('/:id', categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;