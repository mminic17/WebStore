const getUserFromLocalStorage = () => {
  return localStorage.getItem("userInformation")
    ? JSON.parse(localStorage.getItem("userInformation"))
    : { name: "", email: "", username: "", password: "" };
};
const Header = {
  after_render: async () => {},
  render: async () => {
    const name = getUserFromLocalStorage().name;
    return `
        <li>
            <a href="/#/" class="nav-links">Home</a>
        </li>
        <li>
        ${
          name
            ? `<a href="/#/profile" class="nav-links">${name}</a>`
            : `<a href="/#/login" class="nav-links">Sign In</a>`
        }
        </li>
        <li>
            <a href="/#/cart" class="nav-links nav-links-btn"
                >Shopping Cart</a>
        </li>
      `;
  },
};

export default Header;
