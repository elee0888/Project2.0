// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");
var Shop = require('nodejs-cart-lna');
var path = require('path');

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json(req.user);

  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });
//Setting up category route, runs on page load
  app.get("/api/category", function(req, res)
  {   
      db.Category.findAll({}).then(function(dbCategory)
      {
        res.json(dbCategory);
      });
  });

  app.post("/api/cart", function(req, res) {
    console.log("Entering cart route")// + req.body.item_name);
    console.log(req.body);
    db.Cart.create({
      item_name: req.body.item_name,
      item_quantity: req.body.item_quantity,
      item_price: req.body.item_price,
      UserId: req.body.UserId
      //user_id: db.User.user_id 
    }).then(function(dbCart)
     {
      db.Cart.findOne(
         {
           where:
           {
              item_quantity: req.body.item_quantity
           }
         })
        res.json(req.body.item_quantity);
     });
  });
  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    console.log("inside app.get")
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

    // GET route for getting all of the items created.
  app.get("/api/items", function (req, res){
    console.log("User id: " + req.query.user_id)
      var query = {};
    if (req.query.user_id) {
      query.UserId = req.query.user_id;
      console.log("User id: " + req.query.user_id)
    }
    db.Cart.findAll({
      where: query,
      include: [db.User]
    }).then(function(dbCartItem) {
      res.json(dbCartItem);
    });
  });
app.get("/api/addToCart/:id", function (req, res){
  var query = {};
    if (req.query.user_id) {
      query.UserId = req.query.user_id;
    }
  db.Cart.findAndCountAll({
    where: {
      UserId: req.params.id
    }
  }).then(function(items)
    {
    console.log(items);
        var numOfItems = 0; 
        for (var i = 0; i< items.rows.length; i++)
        {
          //var lineItem = items.rows[i].item_price * items.rows[i].item_quantity;
          var itemCount = items.rows[i].item_quantity + numOfItems;
          numOfItems = itemCount;
          console.log(numOfItems)
        }
        res.json(numOfItems);
    });
});

app.get("/api/users", function(req, res){
  db.User.findAndCountAll({include: [db.Cart]}).then(function(users){
    res.json(users);
  });
});


app.get("/api/viewCart/:id", function (req, res){
  console.log("Entering get viewcart ");
  console.log(req.query.user_id);
  var itemList = [];
  var query = {};
    if (req.query.user_id) {
      query.UserId = req.query.user_id;
    }
  db.Cart.findAndCountAll({
    where: {
      UserId: req.params.id
    }
  }).then(function(items)
    {
    console.log(items);
    //  return  function (lineItem) 
    //   {
         
         //var numOfItems = 0; 
        for (var i = 0; i< items.rows.length; i++)
        {
          var lineItem = items.rows[i].item_price * items.rows[i].item_quantity;
          console.log(lineItem);
          db.LineItem.create({
            lineNumber: i + 1,
            itemDesc: items.rows[i].item_name,
            unitPrice: items.rows[i].item_price,
            quantity: items.rows[i].item_quantity,
            subTotal: lineItem
          }).then(function(newItems){
            console.log("New list items: " + items)
            itemList.push(newItems);
            //res.json(items);
            res.sendFile(path.join(__dirname, "../public/members.html"));

          })
          //res.json(itemList);
        }
        
        //return lineItemPrice;
        //console.log(items.rows[0].item_quantity)
        //res.json(itemList);
        //res.parseInt(items.count + items.rows.item_quantity);
      //};
      return;
    });
    //res.json(itemList);
});

 // 
};
