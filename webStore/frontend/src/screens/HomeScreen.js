import Rating from "../resources/Rating.js";

async function getProducts() {
  const response = await fetch("http://localhost:3000/api/products", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response || !response.ok) {
    return `<div>Error in getting products!!!</div>`;
  }
  const products = await response.json();
  return products;
}

async function getCategories() {
  const response = await fetch("http://localhost:3000/api/categories", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response || !response.ok) {
    return `<div>Error in getting categories!!!</div>`;
  }
  const categories = await response.json();
  return categories;
}

const HomeScreen = {
  after_render: () => {
    $(".buttonC").click(function () {
      let attr = $(this).attr("data-li");
      $(".buttonC").removeClass("active");
      $(this).addClass("active");
      $(".productFilter").hide();
      if (attr == "all") {
        $(".productFilter").show();
      } else if (attr == "Waistcoats") {
        $("." + attr).show();
      } else if (attr == "Sweatshirts") {
        $("." + attr).show();
      } else if (attr == "Slippers") {
        $("." + attr).show();
      } else if (attr == "Tracksuits") {
        $("." + attr).show();
      } else if (attr == "T-Shirts") {
        $("." + attr).show();
      } else if (attr == "Watches") {
        $("." + attr).show();
      }
    });
  },
  render: async () => {
    let products = await getProducts();
    let categories = await getCategories();
    return `
    <div class="button_grp">
          <ul>
            <li data-li="all" class="buttonC active">All</li>
            ${categories
              .map(
                (category) =>
                  `<li data-li="${category.name}" class="buttonC">
              ${category.display_name}</li>`
              )
              .join("\n")}
          </ul>
    </div>
        <br><br>
        </div>
        <ul class="products">
        ${products
          .map(
            (product) => `
        <li class="productFilter ${product.category}">
          <div class="product">
          <a href="/#/product/${product._id}">
                <img src="${product.image}" alt="${product.name}" />
            </a>
            <div class="product-name">
                <a href="/#/product/${product._id}"><h1> ${
              product.name
            } </h1></a>
            </div>
            <hr />
            <div class="product-rating">
              ${Rating.render(product.rating, product.numReviews)}
            </div>
            <div class="product-brand">
               <h2> ${product.brand} </h2>
            </div>
            <div class="product-price">
               <h1> $${product.price} </h1>
            </div>
          </div>
        </li>
        `
          )
          .join("\n")}
        </ul>`;
  },
};

export default HomeScreen;
