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
