export const getProductById = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/products/${id}`,
      {
        "Content-Type": "application/json",
      }
    );
    if (response.statusText !== "OK") {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    console.log(err);
    return { error: err.message };
  }
};

export const re_render = async (component) => {
  document.getElementById("main-container").innerHTML =
    await component.render();
  await component.after_render();
};

export const login = async ({ username, password }) => {
  try {
    const response = await axios.post(`http://localhost:3000/api/users/login`, {
      data: { username, password },
    });
    if (response.statusText !== "OK") {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (error) {
    console.log(error);
    return { error: error.response.data.message || error.message };
  }
};

export const register = async ({ name, email, username, password }) => {
  try {
    const response = await axios.post(
      `http://localhost:3000/api/users/register`,
      {
        data: { name, email, username, password },
      }
    );
    if (response.statusText !== "OK") {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (error) {
    console.log(error);
    return { error: error.response.data.message || error.message };
  }
};

export const showMessageError = (message, callback) => {
  document.getElementById("message-error").innerHTML = `
  <div>
  <div id = "message-error-content">
  ${message}
  </div>
  <button id="message-error-ok-button">OK</button>
  </div>`;
  document.getElementById("message-error").classList.add("active");
  document
    .getElementById("message-error-ok-button")
    .addEventListener("click", () => {
      document.getElementById("message-error").classList.remove("active");
      if (callback()) {
        callback();
      }
    });
};
