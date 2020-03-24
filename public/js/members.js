
var categorySelect = $("#categoryList");
var listOption;
var itemCard = $("#item-container").clone();
var cartListTemplate= $("#cartListItem").clone()
var cartArray = [];
// var addToCart = $(".bottom-wrap");

var itemArray = [];
var userID;

$(document).ready(function() {

  var userInput = categorySelect.val();
  var currency = $("#currency").val()
  $("#item-container").remove();
  $("dropdown-cart").empty();
  getCategory();

  
  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.email);
    
    userID = data.id;
    // console.log("Data ID: ");
    // console.log(userID);
  });

  $(document).on("click", "#cart", function(event){
    event.preventDefault();

    console.log("on click cart");
    queryUrl = "api/viewCart/" + userID;
  
   // $.get(queryUrl, function(data) {
      // console.log("Data:");
      // console.log(data);
      // Just setting value to test
         var data = [
            {"item_name":"Toy 1", "item_price":5.50},
            {"item_name":"Toy 2", "item_price":10.50}
          ];

      console.log(data);
        
      renderAddToCart(data);
      
    //});
    // $(".numofItem").text(data);
  });
  // A function to get categories and then render our list of Categories
  function getCategory() {
    console.log("inside user-data route");
    $.get("/api/category", renderCategoryList);
  }

  // Function to render a list of categories
  function renderCategoryList(data) {
    console.log("inside rendercategory");
    var rowsToAdd = [];
    for (var i = 0; i < data.length; i++) {
      rowsToAdd.push(createCategoryList(data[i]));
    }
    
    categorySelect.empty();
    categorySelect.append(rowsToAdd);
  
  }
  // Creates the category options in the dropdown
  function createCategoryList(category) {
    
    console.log("inside create category");
    console.log("User ID:")
    console.log(userID);
    listOption = $("<li>");
    var linkElement = $("<a>");
    listOption.append(linkElement);
    linkElement.attr("value", category.id);
    linkElement.attr("href", "#");
    linkElement.text(category.category_name);
    return listOption;
  }



  //function to get selected category

  async function getCategoryValue(event){
    event.stopPropagation();
    // $("#item-container").remove();
    console.log("inside getcategoryname function");
    var categoryName = $(event.target).text();
    console.log(categoryName);
    getAmazonData(categoryName);
    //return categoryName;
  }

});

async function getAmazonData(keyword){
  console.log("keyword:" + keyword);
  const header = {
    "async": true,
    "crossDomain": true,
    "url": `https://amazon-price1.p.rapidapi.com/search?keywords= ${keyword}&marketplace=US`,
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "amazon-price1.p.rapidapi.com",
      "x-rapidapi-key": process_env_KEY
    }
  }
  await $.ajax(header).done(function (response) {
    generateItem(response);

  });
}  

// generates new item card
function generateNewCard(data) {
    
  let newItemCard = itemCard.clone();
  //Item Details
  newItemCard.find(".title").html(data.title).text();
  newItemCard.find("#image").attr("src", data.image);
  newItemCard.find(".price").html(data.price).text();
  newItemCard.find(".price-old").html(data.listPrice).text();

  return newItemCard;
}

//Renders generated item cards
function generateItem(response) {
  const results  = response;
  results.forEach((item) => {
  
      let newGeneratedItem = new Item(item.imageUrl, item.title,item.price, item.listPrice);
      itemArray.push(newGeneratedItem);
      //Make the card element from the NewGeneratdItem
      let addItemCard= generateNewCard(newGeneratedItem);
      $(".row").prepend(addItemCard);

  });
}


function itemCart(event) {
  event.preventDefault();

  var itemTitle =  ($(this)
  .prev()
  .text()).trim();
  var itemPrice =  ($(this)
  .find(".price")
  .text()).trim();
  itemPrice = itemPrice.slice(1);
  var quantity = 1;

  addToCart(itemTitle, itemPrice, quantity);
  
  var index = cartArray.findIndex(x => x.Title== itemTitle)
  // here you can check specific property for an object whether it exist in your array or not
  if (index === -1){
    cartArray.push({'Title': itemTitle, 'Price': itemPrice, 'Quantity': 1});
  }
  else {
    console.log("object already exists")
    cartArray[index].Quantity += 1;
  }
  var totalItems = 0;
  cartArray.forEach((item) => {
    console.log(item.Title);
    console.log(item.Price);
    console.log(item.Quantity);
    totalItems += item.Quantity;
    $(".numOfItem").text(totalItems);

  });
}

//post request to add item into the cart

function addToCart(item_name, item_price, item_quantity) {
  $.post("/api/cart", {
    item_name: item_name,
    item_quantity: item_quantity,
    item_price: item_price,
    UserId: userID
  })
    .then(function() {
      console.log("Item added to cart!");
    })
    .catch(function(err) {
      console.log(err);
    });
}

//render list of items in cart

function generateCartList(data){
  cartList  = cartListTemplate.clone();
  //Item Details
  cartList.find(".cartItemName").html(data.item_name).text();
  cartList.find(".cartItemPrice").html(data.item_price).text();
  return cartList;

}

function renderAddToCart(response){
  console.log("Inside rendercart");
  console.log(response)
  const results  = response;
  results.forEach((item) => {
    console.log("Item: ");
      console.log(item);
      //Make the card element from the NewGeneratdItem
      let cartItem = generateCartList(item);
      $(".dropdown-cart").prepend(cartItem);
  });

}


categorySelect.on("click", getCategoryValue);
$(document).on("click", ".bottom-wrap", itemCart);





      
   

    












