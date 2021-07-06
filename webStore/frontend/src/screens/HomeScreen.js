async function getProducts() {
  const res = await fetch("../data/products.json");
  const data = await res.json();
  console.log(data);
  return data;
}

const HomeScreen = {
  render: async () => {
    //const { products } = data; -> ES6 property products from data.js
    let products = await getProducts();
    return `
    <div class="button_grp">
          <ul>
            <li data-li="all" class="button active">All</li>
            <li data-li="t-Shirts" class="button">T-Shirts</li>
            <li data-li="tracksuits" class="button">Tracksuits</li>
            <li data-li="slippers" class="button">Slippers</li>
            <li data-li="sweatshirts" class="button">Sweatshirts</li>
            <li data-li="waistcoats" class="button">Waistcoats</li>
            <li data-li="watches" class="button">Watches</li> 
          </ul>
    </div>
        <br><br>
        </div>
        <ul class="products">
        ${products
          .map(
            (product) => `
        <li>
          <div class="product">
          <a href="/#/product/${product._id}">
                <img src="${product.image}" alt="${product.name}" />
            </a>
            <div class="product-name">
                <a href="/#/product/${product._id}"><h1> ${product.name} </h1></a>
            </div>
            <hr />
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
