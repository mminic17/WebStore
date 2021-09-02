import { parseUrl } from "../parseUrl.js";
import { getProductById } from "../api.js";
import Rating from "../resources/Rating.js";

const getUserFromLocalStorage = () => {
  return localStorage.getItem("userInformation")
    ? JSON.parse(localStorage.getItem("userInformation"))
    : { name: "", email: "", username: "", password: "" };
};

const ProductDetailsScreen = {
  after_render: async () => {
    const request = parseUrl();
    const name = getUserFromLocalStorage().name;
    if (name) {
      document
        .getElementById("addToCart")
        .addEventListener("click", function () {
          document.location.hash = `/cart/${request.id}`;
        });
    } else {
      document.location.hash = `/login`;
    }
  },
  render: async () => {
    const request = parseUrl();
    const product = await getProductById(request.id);
    if (product.error) {
      return `<div>${product.error}</div>`;
    }
    return `
    <div class="product-content">
      <div class="back-to-homepage">
        <a href="/#/"><< Back to Home</a>
      </div>
      <div class="product-details">
      <div class="details">
        <div class="product-details-image">
          <img src="${product.image}" alt="${product.name}"/>
        </div>
        <div class="product-details-info">
          <ul>
            <li>
              <h1>${product.name}</h1>
            </li>
            <li>
              ${Rating.render(product.rating, product.numReviews)}
            </li>
            <li>
              Price: <strong>$${product.price}</strong>
            </li>
            <li>
              Description:
              <hr/>
              <div class="description">
                ${product.description}
              </div>
            </li>
          </ul>
        </div>
        <div class="product-details-addToCartAction">
          <ul>
            <li>
              Price: $${product.price}
            </li>
            <li>
              Status: 
              ${
                product.countInStock > 0
                  ? `<span class="success">Available</span>`
                  : `<span class="no-success">Unavailable</span>`
              }
            </li>
            <li>
              <button id ="addToCart" class="primary">
                Add To Cart
              </button>
            </li>
          </ul>
        </div>
      </div>
      </div>
    </div>`;
  },
};

export default ProductDetailsScreen;
