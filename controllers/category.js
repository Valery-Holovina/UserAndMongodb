const Category = require('../models/Category')
 
/*
getAll
getById
remove
create
update
*/
 
exports.getAll = async (req, res) => {
    // res.json({mesage: 'Categories: get all'})
    try {
        const categories = await Category.find()
        res.status(200).json(categories)
    } catch (err) {
        res.status(500).json({ message: 'Error fetching categories!' })
    }  
}
 
exports.getById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id)
        if (!category) {
            return res.status(404).json({ message: 'Category not found!' })
        }
        res.status(200).json(category)
    } catch (err) {
        res.status(500).json({ message: 'Error fetching category!' })
    }
}  
 
exports.remove = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id)
        if (!category) {
            return res.status(404).json({ message: 'Category not found!' })
        }
        res.status(200).json({ message: 'Category deleted successfully!' })
    } catch (err) {
        res.status(500).json({ message: 'Error deleting category!' })
    }
}  
 
exports.create = async (req, res) => {
    const newCategory = new Category({
        name: req.body.name,
        imageSrc: req.body.imageSrc,
        user: req.user.id
    })
 
    try {
        const savedCategory = await newCategory.save()
        res.status(201).json(savedCategory)
    } catch (err) {
        res.status(500).json({ message: 'Error creating category!' })
    }
}
 
exports.update = async (req, res) => {
    try {
        const updatedCategory = await Category.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                imageSrc: req.body.imageSrc,
                user: req.user.id
            },
            { new: true }
        )
        if (!updatedCategory) {
            return res.status(404).json({ message: 'Category not found!' })
        }
        res.status(200).json(updatedCategory)
    } catch (err) {
        res.status(500).json({ message: 'Error updating category!' })
    }
}  
 