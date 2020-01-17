const router = require ('express').Router()

router.get("/goo",(req,res,next) => {
    res.json({
        message: "protected route"
    })
})


module.exports = router
