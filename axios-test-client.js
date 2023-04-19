import axios from "axios";

const URL = "http://localhost:80";

const testGetProducts = async () => {
  try {
    const response = await axios.get(`${URL}/api/product`);
    console.log("Products", response.data);
  } catch (error) {
    console.log(error);
  }
};

const testGetProductById = async () => {
  try {
    const response = await axios.get(
      `${URL}/api/product/63f3dc6b10101e8667b55e9f`
    );
    console.log("Product by Id (Id 63f3dc6b10101e8667b55e9f)", response.data);
  } catch (error) {
    console.log(error);
  }
};

let saveProductId = "";

const testSaveProduct = async () => {
  try {
    const response = await axios.post(`${URL}/api/product`, {
      name: "Chevrolet Prisma",
      description: "Chevrolet Prisma 1.6 4p Sedan",
      code: "5ea23j8",
      thumbnail:
        "https://www.chevrolet.com.ar/content/dam/chevrolet/mercosur/argentina/espanol/index/cars/cars-subcontent/04-images/chevrolet-autos-nuevo-onix-v1.png?imwidth=960",
      price: 12500,
      stock: 1500,
    });
    console.log("Save product", response.data);
    saveProductId = response.data.data.id;
  } catch (error) {
    console.log(error);
  }
};

const testUpdateProductById = async () => {
  try {
    const updateBody = {
      name: "Chevrolet Onix Plus",
      description: "Chevrolet Onix Plus 1.6 4p Sedan",
      price: 13000,
      stock: 1430,
    };
    const response = await axios.put(
      `${URL}/api/product/${saveProductId}`,
      updateBody
    );
    const productById = await axios.get(`${URL}/api/product/${saveProductId}`);
    console.log(
      "Update product",
      response.data,
      "Updated product",
      productById.data
    );
  } catch (error) {
    console.log(error);
  }
};

const testDeleteProductById = async () => {
  try {
    const response = await axios.delete(`${URL}/api/product/${saveProductId}`);
    console.log("Delete product by Id", response.data);
  } catch (error) {
    console.log(error);
  }
};

await testSaveProduct();
await testGetProducts();
await testGetProductById();
await testUpdateProductById();
await testDeleteProductById();
