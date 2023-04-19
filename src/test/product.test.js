import supertest from "supertest";
import { expect } from "chai";
import { app } from "../server.js";

const api = supertest(app);

describe("Product API endpoints testing suite", () => {
  let productId;

  it("should get all products", async () => {
    const res = await api.get("/api/product");
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("object");
  });

  it("should save a new product", async () => {
    const newProduct = {
      name: "Test product",
      description: "This is a test product",
      code: "Test code",
      thumbnail: "Test thumbnail",
      price: 10,
      stock: 10,
    };
    const res = await api.post("/api/product").send(newProduct);
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("object");
    expect(res.body.data).to.have.property("id");
    productId = res.body.data.id;
  });

  it("should update an existing product", async () => {
    const updatedProduct = {
      name: "Test product updated",
      description: "This is an updated test product",
      code: "Test code updated",
      thumbnail: "Test thumbnail updated",
      price: 15,
      stock: 15,
    };
    const res = await api.put(`/api/product/${productId}`).send(updatedProduct);
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("object");
    expect(res.body.data.updated).to.deep.equal(updatedProduct);
  });

  it("should delete an existing product", async () => {
    const res = await api.delete(`/api/product/${productId}`);
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("object");
    expect(res.body.data.message).to.deep.equal(
      `The object with ID ${productId} has been successfully deleted.`
    );
  });
});
