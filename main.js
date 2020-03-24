// $(document).ready(function() {

    var unirest = require("unirest");
    var req = unirest("GET", "https://amazon-price1.p.rapidapi.com/search");
    var categorySelect = $("#category");
    var userInput = categorySelect.val();
    var currency = $("#currency").val();

    $.get("/api/user_data").then(function(data) {
        $(".member-name").text(data.email);
      });

    getCategory();

    // A function to get Authors and then render our list of Categories
    function getCategory() {
        $.get("/api/category", renderCategoryList);
    }

   

    // Function to either render a list of categories
    function renderCategoryList(data) {
        var rowsToAdd = [];
        for (var i = 0; i < data.length; i++) {
          rowsToAdd.push(createCategoryList(data[i]));
        }
        categorySelect.empty();
        console.log(rowsToAdd);
        console.log(categorySelect);
        categorySelect.append(rowsToAdd);
        categorySelect.val(authorId);
    }
    
    // Creates the category options in the dropdown
    function createCategoryList(category) {
        var listOption = $("<option>");
        listOption.attr("value", category.id);
        listOption.text(category.name);
        return listOption;
      }

    req.query({
        "keywords": "ipnone",
        "marketplace": "US"
    });
    
    req.headers({
        "x-rapidapi-host": "amazon-price1.p.rapidapi.com",
        "x-rapidapi-key": "3f02ee3a6cmshd59f244cdd17b11p1de9e5jsn91062f0f2cd3"
    });
    
    req.end(function (res) {
        if (res.error) throw new Error(res.error);
        // console.log(res.body);
        
        for(i=0; i<res.body.length; i++){
            console.log(res.body[i].title);
            console.log(res.body);
        }
    
    });


//});
