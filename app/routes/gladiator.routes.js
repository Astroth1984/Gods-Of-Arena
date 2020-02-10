module.exports = app => {
    const gladiators = require("../controllers/gladiator.controller.js");
  
    var router = require("express").Router();
  
    
    router.post("/", gladiators.create);
  
   
    router.get("/", gladiators.findAll);
  
    
    router.get("/:id", gladiators.findOne);
  
    
    router.put("/:id", gladiators.update);
  
   
    router.delete("/:id", gladiators.delete);
  
   
    router.delete("/", gladiators.deleteAll);
  
    app.use('/api/gladiators', router);
  };