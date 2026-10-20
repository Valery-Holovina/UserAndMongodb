const Position = require('../models/position')
 
/*
getAll
remove
create
update
*/
 
exports.getAll = async (req, res) => {
    try {
       const positions = await Position.find().populate('category') // get details about category
        res.status(200).json(positions)
    } catch (err) {
        res.status(500).json({ message: 'Error fetching categories!' })
    }  
}
 
 
exports.remove = async (req, res) => {
    try {
        const positions = await Position.findByIdAndDelete(req.params.id)
        if (!positions) {
            return res.status(404).json({ message: 'Position not found!' })
        }
        res.status(200).json({ message: 'Position deleted successfully!' })
    } catch (err) {
        res.status(500).json({ message: 'Error deleting Position!' })
    }
}  
 
exports.create = async (req, res) => {
    const newPosition = new Position({
        name: req.body.name,
        cost: req.body.cost,
        user: req.user.id,
        category: req.body.category
        
    })
 
    try {
        let savedPosition = await newPosition.save()

       savedPosition = await savedPosition.populate('category')

        res.status(201).json(savedPosition)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Error creating position!' })
    }
}
 
exports.update = async (req, res) => {
    try {
        const updatePosition = await Position.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                cost: req.body.cost,
                user: req.user.id,
                category: req.body.category 
               
            },
            { new: true }
        )
        if (!updatePosition) {
            return res.status(404).json({ message: 'position not found!' })
        }
        res.status(200).json(updatePosition)
    } catch (err) {
        res.status(500).json({ message: 'Error updating position!' })
    }
}  