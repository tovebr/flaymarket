//Class Objekt för produkter - Karin
class Product {
  constructor(
    name,
    price,
    description,
    flavorText,
    finishStyle,
    finishCatalog,
    added,
    creator,
    update,
    image
  ) {
    this.name = name;
    this.price = price;
    this.description = description;
    this.flavorText = flavorText;
    this.finishStyle = finishStyle;
    this.finishCatalog = finishCatalog;
    this.added = added;
    this.creator = creator;
    this.update = update;
    this.image = image;
  }
}

//Array för produkter - Karin
const weapons = [];

//pushar in samtliga produkter i array - Karin
weapons.push(
  new Product(
    "M4A4 Howl",
    30000,
    "Has been custom painted with the image of a snarling wolf.",
    " The wolf fights against the thunder of Thor.",
    "Custom Paint Job.",
    "309.",
    "1st May 2014.",
    "Valve.",
    "The Hunt Begins.",
    "assets/img-skins/M4A4Howl.png"
  )
);
weapons.push(
  new Product(
    "AWP Gungnir",
    1300,
    "Odin’s spear travels down this custom painted pearlscent blue and ivory AWP.",
    "A weapon for the Allfather.",
    "Gunsmith.",
    "756.",
    "19th november 2019.",
    "Valve",
    "Operation Shattered Web.",
    "assets/img-skins/AWPGungnir.png"
  )
);
weapons.push(
  new Product(
    "USP-S Kill Confirmed",
    500,
    "It has been custom painted with the image of a bullet shattering a skull.",
    "2 in the chest, 1 in the head.",
    "Custom Paint Job.",
    "504.",
    "17th September 2015.",
    "Workshop Submission.",
    "Shadow Boxing.",
    "assets/img-skins/USP-SKillConfirmed.png"
  )
);
weapons.push(
  new Product(
    "Desert Eagle Blaze",
    15000,
    "It has been painted by airbrushing transperant paints over a chrome base coat.",
    "The eye never misses.",
    "Andonized Airbrushed.",
    "37.",
    "14th August 2013.",
    "Valve.",
    "The Arms Deal.",
    "assets/img-skins/DesertEagleBlaze.png"
  )
);
weapons.push(
  new Product(
    "AK 47 Asiimov",
    7500,
    "It has been custom painted with a sci-fi design.",
    "Anyone can predict the future... a visionary shapes it.",
    "Custom Paint Job.",
    "3994",
    "6th December 2018.",

    "Workshop Submission.",
    "Welcome to the Danger Zone.",
    "assets/img-skins/AK47Asiimov.png"
  )
);



window.onload = function () {
  let articles = document
    .getElementById("articles")
    .getElementsByClassName("container d-flex")[0];
  //skriver ut array av produkter man kan köpa
  //och ger varje produkt en köp och info knapp med unikt id
  for (let i = 0; i < weapons.length; i++) {
    articles.innerHTML += `
    <div class="card mb-4">
    <div class="header-container">
      <img src="${weapons[i].image}" alt="${weapons[i].name}" /><br>
      
    </div>
    <div class="info-container pt-3">
    <h4 class="text-center">${weapons[i].name}</h4>
      <p>
        <span class="category">Description:</span> ${weapons[i].description}
      </p>
      <p><span class="category">Price:</span> $${weapons[i].price}</p>
      
      <div class="btn-group mt-4 mb-4">
        <button id="more-${[
          i,
        ]}" class="btn-more"><i class="fa fa-info-circle"></i> More</button>
        <button id="buy-${[
          i,
        ]}"class="btn-buy"><i class="fa fa-cart-plus"></i> Buy</button>
      </div>
    </div>
  </div>
    `;
  }
  //skapar en enkel räknar för antal produkter som är köpta
  let divCounter = document.getElementById("counter");
  let counter = 0;
  //loopar igenom dom unika knapparna och gör att dom korresponderar med rätt objekt
  //dvs trycker man på knapp 1 info får man fram info om objekt 1 i arrayen
  for (let i = 0; i < weapons.length; i++) {
    document
      .getElementById("more-" + [i])
      .addEventListener("click", function () {
        let productInfo = document.getElementById("productInformation");
        //hämtar koordinater för musen när man klickar på knappen
        let x = event.clientX;
        let y = event.clientY;
        productInfo.innerHTML = `
        <p>
              <span class="category">Description:</span>${weapons[i].description}
            </p>
            <p><span class="category">Finish Catalouge:</span> ${weapons[i].finishCatalog}</p>
            <p><span class="category">Finish Style:</span> ${weapons[i].finishStyle}</p>
            <p><span class="category">Added:</span> ${weapons[i].added}</p>
            <p><span class="category">Creator:</span>${weapons[i].creator}</p>
            <p><span class="category">Creator:</span> ${weapons[i].update}</p>
           `;
        //bestämmer var inforutan ska vara baserad på musens koordinater
        productInfo.style.display = "inline";
        productInfo.style.left = x + 20 + "px";
        productInfo.style.top = y - 200 + "px";
        productInfo.style.zIndex = 10;
        productInfo.style.width = "250px";
        productInfo.style.color = "white";
      });
    //lämnar man musen från infoknappen försvinner rutan med produktinformation
    document
      .getElementById("more-" + [i])
      .addEventListener("mouseout", function () {
        let productInformation = document.getElementById("productInformation");
        productInformation.style.display = "none";
      });
  }

  const cart = document.getElementById("cart").querySelector("div");

  //skapar en ny array av köpta produkter
  const boughtItems = [];
  const totalPriceDiv =
    document.getElementsByClassName("cart-summary-price")[0];
  //hämtar köpknapp
  let buyProduct = document
    .getElementById("articles")
    .getElementsByClassName("btn-buy");
  let totalPriceSum = 0;
  for (let i = 0; i < buyProduct.length; i++) {
    buyProduct[i].addEventListener("click", function () {
      //variabel för pris samt en rad som ökar räknaren med 1
      const totalPrice = [];
      counter++;
      divCounter.innerHTML = counter;
      //skapar en kopia av objeket man köper och skickar in den i en array
      const product = Object.assign({}, weapons[i]);
      boughtItems.push(product);
      //skriver ut listan av köpta produkter
      //om ett objekt är tomt skriver den bara ut en tom div
      cart.innerHTML = "";
      for (let y = 0; y < boughtItems.length; y++) {
        if (boughtItems[y].name === undefined) {
          cart.innerHTML += `<div class="products"><i></i></div>`;
        } else {
          cart.innerHTML += `<div class="products"><i class="fa fa-trash"></i> - <a>${boughtItems[y].name} $${boughtItems[y].price}</a></div>`;
          totalPrice.push(boughtItems[y].price);
        }
      }
      //kalkylerar det totala priset för alla produkter
      totalPriceSum = totalPrice.reduce((a, b) => a + b);
      totalPriceDiv.innerHTML = "$" + totalPriceSum;
      listCart();
    });
  }

  //hämtar alla div med classen products i vagnen
  function listCart() {
    let list = cart.getElementsByClassName("products");
    for (let i = 0; i < list.length; i++) {
      //kollar efter <i> i diven och lägger till en funtion på <i>
      //trycker man på <i>, som är soptunnan tar man bort innehållet i div
      //reduerar det totala priset och räknaren, antal, produkter, minskar med ett
      list[i].querySelector("i").addEventListener("click", function () {
        list[i].innerHTML = "";
        totalPriceSum -= boughtItems[i].price;
        counter--;
        divCounter.innerHTML = counter;
        totalPriceDiv.innerHTML = "$" + totalPriceSum;
        //tar bort innehållet i korresponderande objekt  i arrayen boughitems
        boughtItems.splice(i, 1, "");
      });
    }
  }

  //knappen för att öppna modal med köpta produkter
  btn = document.getElementById("buyBtn");
  btn.addEventListener("click", function () {
    let modalBody = document.getElementsByClassName("modal-body")[0];
    //börjar med att tömma den
    modalBody.innerHTML = "";
    //kollar igenom boughItems. Om den är noll skrivs texten ut
    if (boughtItems.length === 0) {
      modalBody.innerHTML = "you have nothing in your cart :(";
    }
    //annars skrivs följande ut
    //om ett objekt har blivit splicat och därför tomt, skrivs inget ut
    if (boughtItems.length >= 1) {
      modalBody.innerHTML = "You have bought: <br><br>";
      for (let i = 0; i < boughtItems.length; i++) {
        if (boughtItems[i].name === undefined) {
          modalBody.innerHTML = "";
        } else {
          modalBody.innerHTML += boughtItems[i].name +=
            " för $" + boughtItems[i].price + "<br>";
        }
      }
      //kalkylationen av det totala priset för produkterna skrivs ut
      modalBody.innerHTML += "<br>Total price: $" + totalPriceSum + "<br>";
    }
  });

  //trycker man på modalens stängknapp sätts display: none på modalen
  document
    .getElementById("closeModalBtn")
    .addEventListener("click", function () {
      document.getElementById("modal").style.display = "none";
    });

  //trycker man på räknaren bredvid korgen visas modalen med produktlistan
  divCounter.addEventListener("click", function () {
    document.getElementById("modal").style.display = "block";
  });
};
