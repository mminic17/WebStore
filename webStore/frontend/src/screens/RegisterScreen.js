import { register, showMessageError } from "../api.js";

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

const Register = {
  after_render: async () => {
    document
      .getElementById("register-form")
      .addEventListener("submit", async (e) => {
        e.preventDefault();
        // console.log(document.getElementById("username").value);
        // console.log(document.getElementById("password").value);
        var name = document.getElementById("name").value;
        var email = document.getElementById("email").value;
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;
        var repassword = document.getElementById("repassword").value;

        /*regex expression */
        const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!regexEmail.test(email)) {
          showMessageError("Please insert valid email.");
          return;
        }

        if (password !== repassword) {
          showMessageError(
            "Repassword is not in the same format like first one."
          );
          return;
        }
        const regexPassword = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
        //  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})$/;
        if (!regexPassword.test(password)) {
          showMessageError("Password is not valid.");
          return;
        }
        const data = await register({
          name: document.getElementById("name").value,
          email: document.getElementById("email").value,
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
            <form id="register-form">
                <ul class="form-items">
                    <li>
                    <h1>Create Account</h1>
                    </li>
                    <li>
                    <label for="name">Name:</label>
                    <input type="name" name="name" id="name"/>
                    </li>
                    <li>
                    <label for="email">Email:</label>
                    <input type="email" name="email" id="email"/>
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
                    <label for="repassword">Repeat password:</label>
                    <input type="password" name="repassword" id="repassword"/>
                    </li>
                    <li>
                    <button type="submit" class="primary">Create</button>
                    </li>
                    <li>
                    <div>
                        Already have an account?!
                        <a href="/#/login">Login</a>
                    </div>
                    </li>
                </ul>
            </form>
        </div>
        `;
  },
};

export default Register;
