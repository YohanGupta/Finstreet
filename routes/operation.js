const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { SchemaJoi } = require('../JoiSchema');
const { isLoggedIn } = require('../middleware');
const ExpressError = require('../utils/ExpressError');
const User = require('../models/user');

// const validateDetails = (req, res, next) => {
//     console.log("Before")
//     console.log(req.body)
//     const { error } = SchemaJoi.validate(req.body);
//     console.log(error)
//     if (error) {
//         const msg = error.details.map(el => el.message).join(',')
//         throw new ExpressError(msg, 400)
//     } else {
//         console.log('After')
//         next();
//     }
// }


router.get('/', catchAsync(async (req, res) => {
    const users = await User.find({});
    res.render('operation/index', { users })
}));


router.get('/:id', catchAsync(async (req, res,) => {
    const user = await User.findById(req.params.id)
    if(!user){
        req.flash('error', "Cannot find that user")
        return res.redirect('/users')
    }
    res.render('operation/show', { user });
}));

router.get('/:id/edit', isLoggedIn, catchAsync(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (!user) {
        req.flash('error', 'Cannot find that user');
        return res.redirect('/users');
    }
    res.render('operation/edit', { user });
}))

router.put('/:id', isLoggedIn, catchAsync(async (req, res) => {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body);
    req.flash('success', 'Successfully updated user details!');
    res.redirect(`/users/${user._id}`)
}));

router.delete('/:id', isLoggedIn, catchAsync(async (req, res) => {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted user')
    res.redirect('/users');
}));


module.exports = router;