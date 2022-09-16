const express = require('express')
const router = express.Router()
const uuid = require('uuid')
let users = require('../../examples/users')

// get all users
router.get('/', (req, res) => {
    console.log("In Get All Users")
    res.json(users)
});

//get user by id
router.get('/:id', (req, res) => {
    console.log('In Get User By Id')
    try {
        const searchUserById = users.some(user => user.id === req.params.id)
        if (searchUserById) {
            res.json(users.filter(user => user.id === req.params.id))
        } else {
            res.sendStatus(400)
            throw new Error('User Not Found')
        }
    } catch (error) {
        console.log(error)
        throw error
    }
});

//create New user
router.post('/', (req, res) => {
    console.log("In Create User")
    try {
        const newUser = {
            id: uuid.v4(),
            name: req.body.name,
            email: req.body.email
        }
        if (!newUser.name || !newUser.email) {
            return res.sendStatus(400)
        }
        users.push(newUser)
        res.json(users)
    } catch (error) {
        console.log(error);
        throw error
    }
});

// Update User
router.put('/:id', (req, res) => {
    console.log("In Update User");
    try {
        const searchUserById = users.some(user => user.id === req.params.id)
        const userId = req.params.id
        const updatedUser = req.body
        if (searchUserById) {
            // // 1st way to update the user according to ID
            // users.forEach(user => {
            //     if (user.id === userId) {
            //         user.name = updatedUser.name ? updatedUser.name : user.name
            //         user.email = updatedUser.email ? updatedUser.email : user.email
            //         console.log("User Updated.")
            //         res.json("Message: User Updated", user)
            //     }
            // })

            // 2nd way to update the user according to ID
            for (const user of users) {
                if (user.id === userId) {
                    user.name = updatedUser.name ? updatedUser.name : user.name
                    user.email = updatedUser.email ? updatedUser.email : user.email
                    console.log("user updated!")
                    res.json(200, user)
                }
            }
            res.json(users)
        } else {
            console.log("user not updated!")
            return res.sendStatus(400)
        }
    } catch (error) {
        console.log(error);
        throw error
    }
});

// delete user
router.delete('/:id', (req, res) => {
    console.log("In Delete User")
    const userId = users.some(user => user.id === req.params.id)
    if (userId) {
        users = users.filter(user => user.id !== req.params.id)
        res.json(200, users)
    } else {
        console.log("user not deleted!")
        res.sendStatus(400)
    }
})

module.exports = router