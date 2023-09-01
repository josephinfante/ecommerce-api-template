import { expect, test } from "vitest";
import * as request from "supertest";
import { app } from "../src/app";
import { ENV } from "../config";

const isDevelopment = ENV === "development";

const product = {
    name: `product ${Math.random().toString(36).substring(7)}`,
	description: "product description",
	price: 10.00,
	stock: 2,
    images: ["https://picsum.photos/200/300"]
};
let product_id: string = '';

test.runIf(isDevelopment)('POST /api/v1/products', async function() {
    const response = await request.agent(app)
        .post('/api/v1/products')
        .send(product)
        .expect(201)
        .then((response) => {
            return response.body;
        });
    product_id = response._id;
    expect(response).toStrictEqual({
        _id: response._id,
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        images: product.images,
        created_at: expect.any(String),
        updated_at: expect.any(String),
    });
});

test.runIf(isDevelopment)('GET /api/v1/products/:id', async function() {
    const response = await request.agent(app)
        .get(`/api/v1/products/${product_id}`)
        .expect(200)
        .then((response) => {
            return response.body;
        });
    expect(response).toStrictEqual({
        _id: product_id,
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        images: product.images,
        created_at: expect.any(String),
        updated_at: expect.any(String),
    });
});

test.runIf(isDevelopment)('PUT /api/v1/products/:id', async function() {
    const response = await request.agent(app)
        .put(`/api/v1/products/${product_id}`)
        .send({
            name: 'updated product name',
            description: 'updated product description',
        })
        .expect(200)
        .then((response) => {
            return response.body;
        });
    expect(response).toStrictEqual({
        _id: product_id,
        name: 'updated product name',
        description: 'updated product description',
        price: product.price,
        stock: product.stock,
        images: product.images,
        created_at: expect.any(String),
        updated_at: expect.any(String),
    });
});

test.runIf(isDevelopment)('DELETE /api/v1/products/:id', async function() {
    await request.agent(app)
        .delete(`/api/v1/products/${product_id}`)
        .expect(204)
});

test.runIf(isDevelopment)('GET|PUT|DELETE /api/v1/products, should throw error "ID required"', async function() {
    await request.agent(app)
        .get('/api/v1/products')
        .expect(400)
    await request.agent(app)
        .put('/api/v1/products')
        .expect(400)
    await request.agent(app)
        .delete('/api/v1/products')
        .expect(400)
});

test.runIf(isDevelopment)('GET|PUT|DELETE /api/v1/products/1, should throw error "no product found with ID 1"', async function() {
    let getResponse;
    let putResponse;
    let deleteResponse;
    try {
        getResponse = await request.agent(app)
            .get('/api/v1/products/1')
    } catch (error) {
        expect(error).toBeInstanceOf(Error)
    }
    if (getResponse) {
        expect(getResponse.status).toBe(500);
        expect(JSON.parse(getResponse.text)).toStrictEqual({error:"No product found with ID 1"});
    }

    try {
        putResponse = await request.agent(app)
            .put('/api/v1/products/1')
    } catch (error) {
        expect(error).toBeInstanceOf(Error)
    }
    if (putResponse) {
        expect(putResponse.status).toBe(500);
        expect(JSON.parse(putResponse.text)).toStrictEqual({error:"No product found with ID 1"});
    }

    try {
        deleteResponse = await request.agent(app)
            .delete('/api/v1/products/1')
    } catch (error) {
        expect(error).toBeInstanceOf(Error)
    }
    if (deleteResponse) {
        expect(deleteResponse.status).toBe(500);
        expect(JSON.parse(deleteResponse.text)).toStrictEqual({error:"No product found with ID 1"});
    }
});