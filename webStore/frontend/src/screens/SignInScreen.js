import { login, showMessageError } from "../api.js";

function setUserInLocalStorage({
  _id = "",
  name = "",
  email = "",
  username = "",
  password = "",
  token = "",
  isAdmin = false,
}) {
  localStorage.setItem(
    "userInformation",
    JSON.stringify({ _id, name, email, username, password, token, isAdmin })
  );
}

const getUserFromLocalStorage = () => {
  return localStorage.getItem("userInformation")
    ? JSON.parse(localStorage.getItem("userInformation"))
    : { name: "", email: "", username: "", password: "" };
};

const SignIn = {
  after_render: async () => {
    document
      .getElementById("login-form")
      .addEventListener("submit", async (e) => {
        e.preventDefault();
        console.log(document.getElementById("username").value);
        console.log(document.getElementById("password").value);
        const data = await login({
          username: document.getElementById("username").value,
          password: document.getElementById("password").value,
        });
        if (data.error) {
          showMessageError(data.error);
        } else {
          console.log(data.name);
          setUserInLocalStorage(data);
          document.location.hash = "/";
        }
      });
  },
  render: () => {
    if (getUserFromLocalStorage().name) {
      document.location.hash = "/";
    }
    return `
        <div class="form-container">
            <form id="login-form">
                <ul class="form-items">
                    <li>
                    <h1>Login</h1>
                    </li>
                    <li>
                    <label for="username">Username:</label>
                    <input type="username" name="username" id="username"/>
                    </li>
                    <li>
                    <label for="password">Password:</label>
                    <input type="password" name="password" id="password"/>
                    </li>
                    <li>
                    <button type="submit" class="primary">Login</button>
                    </li>
                    <li>
                    <div>
                        Don't have an account?!
                        <a href="/#/register">Create your account</a>
                    </div>
                    </li>
                </ul>
            </form>
        </div>
        `;
  },
};

export default SignIn;
