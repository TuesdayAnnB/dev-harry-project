// Develop a web-based, mobile-responsive APP using common libraries that is:
//Described with a readme document (featuring an image of bad interface?)
// Writes the data to the console in JSON format

$(() => {
  console.log("document ready!");
  const form = document.getElementById("myForm");
  const ingredients = [
    "Chocolate Shavings",
    "Whipped Cream",
    "Candy Cane",
    "Cinnamon",
    "Creamer",
    "Powdered Sugar"
  ];
  const altIngredients = [
    "Eye of Newt",
    "Toe of Frog",
    "Wool of Bat",
    "Tongue of Dog",
    "Lizard's Leg",
    "Owlet's Wing"
  ];
  const toppingsIDs = [
    "chocshavings",
    "whipcream",
    "candycane",
    "cinnamon",
    "creamer",
    "powsugar"
  ];
  var userOrder = {
    name: "",
    drink: "",
    numDrinks: 0,
    additions: []
  };
  var savedOrder = {
    name: "Tuesday",
    drink: "Cocoa",
    numDrinks: 2,
    additions: ["chocshavings", "cinnamon"]
  };

  document.getElementById("drink").addEventListener("change", function () {
    //finish this so it replaces all the things with their alt values
    $("#toppings").empty();
    if (document.getElementById("drink").value === "The Special") {
      console.log("special");
      for (let i = 0; i < ingredients.length; i++) {
        $("#toppings").append(
          `<div class="form-check" id="additions"> <input class="form-check-input" type="checkbox" value="${altIngredients[i]}" id="${toppingsIDs[i]}"> <label class="form-check-label" for="flexCheckDefault">${altIngredients[i]}</label> </div>`
        );
        // console.log(i);
      }
    } else {
      console.log("not special :(");
      for (let i = 0; i < ingredients.length; i++) {
        $("#toppings").append(
          `<div class="form-check" id="additions"> <input class="form-check-input" type="checkbox" value="${ingredients[i]}" id="chocshavings"> <label class="form-check-label" for="flexCheckDefault">${ingredients[i]}</label> </div>`
        );
        // console.log(i);
      }
    }
  });

  $("#formSubmit").on("click", (e) => {
    e.preventDefault();
    let name = document.getElementById("name").value;
    let drinkChoice = document.getElementById("drink").value;
    let quantity = document.getElementById("numDrinks").value;
    let inputs = form.getElementsByTagName("input");
    let drinkToppings = ["empty"];

    for (let i = 0, j = 0; i < inputs.length; i++) {
      let hasToppings = false;
      if (inputs[i].checked) {
        drinkToppings[j] = inputs[i].value;
        //console.log(drinkToppings[j]);
        j++;
      }
    }

    if (name === "" || drinkChoice === "") {
      console.log("empty values");
      alert("Missing Values");
    } else {
      //load all selected values to console and DOM
      $("#orderPane").empty();
      $("#orderPane")
        .append(`<h3>Your Order: </h3><br>`)
        .append(`<p> Name: ${name} </p><br>`)
        .append(`<p> Drink: ${drinkChoice} </p><br>`)
        .append(`<p> Quantity: ${quantity} </p><br>`);

      console.log(`Name: ${name}`);
      console.log(`Drink: ${drinkChoice}`);
      console.log(`Quantity: ${quantity}`);

      userOrder.name = name;
      userOrder.drink = drinkChoice;
      userOrder.numDrinks = quantity;
      if (drinkToppings[0] !== "empty") {
        let toppingsString = "";
        let consoleString = "Toppings: ";
        for (let i = 0; i < drinkToppings.length; i++) {
          toppingsString = toppingsString + drinkToppings[i] + "<br>";
          userOrder.additions[i] = drinkToppings[i];
          if (i === drinkToppings.length - 1) {
            consoleString = consoleString + `${drinkToppings[i]} `;
          } else {
            consoleString = consoleString + `${drinkToppings[i]}, `;
          }
        }
        console.log(consoleString);
        $("#orderPane").append(`<p> Toppings:<br> ${toppingsString}</p>`);
        //console.log(userOrder);
      }
      console.log("JSON Format:");
      console.log(JSON.stringify(userOrder, null, 2));
    }
  });

  $("#formReset").on("click", (e) => {
    form.reset();
    $("#toppings").empty();
    for (let i = 0; i < ingredients.length; i++) {
      $("#toppings").append(
        `<div class="form-check" id="additions"> <input class="form-check-input" type="checkbox" value="${ingredients[i]}" id="${toppingsIDs[i]}"> <label class="form-check-label" for="flexCheckDefault">${ingredients[i]}</label> </div>`
      );
    }
    $("#orderPane").empty();
    $("#orderPane").append("<h3> Your Order: </h3><br>");
  });

  $("#reloadPrev").on("click", (e) => {
    document.getElementById("name").value = savedOrder.name;
    const dropdown = document.getElementById("drink");
    for (let i = 0; i < dropdown.options.length; i++) {
      if (dropdown.options[i].text === savedOrder.drink) {
        dropdown.selectedIndex = i;
        break;
      }
    }

    for (let i = 0; i < toppingsIDs.length; i++) {
      for (let j = 0; j < savedOrder.additions.length; j++) {
        //console.log(`${toppingsIDs[i]} ${savedOrder.additions[j]}`);
        if (toppingsIDs[i] === savedOrder.additions[j]) {
          //console.log(`added ${document.getElementById(toppingsIDs[i]).value}`);
          document.getElementById(toppingsIDs[i]).checked = true;
        }
      }
    }
    document.getElementById("numDrinks").value = savedOrder.numDrinks;
    //set number of drinks
  });
});
