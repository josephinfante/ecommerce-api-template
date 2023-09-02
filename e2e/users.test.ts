import { expect, test } from "vitest";
import * as request from "supertest";
import { app } from "../src/app";
import { ENV } from "../config";

const isDevelopment = ENV === "development";

const user = {
    first_name: "John",
	last_name: "Doe",
	email: `john.doe${Math.random().toString(36).substring(7)}@gmail.com`,
	password: "password"
};
let user_id: string = '';

test.runIf(isDevelopment)('POST /api/v1/users', async function() {
    const response = await request.agent(app)
        .post('/api/v1/users')
        .send(user)
        .expect(201)
        .then((response) => {
            return response.body;
        });
    user_id = response._id;
    expect(response).toStrictEqual({
        _id: response._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        created_at: expect.any(String),
        updated_at: expect.any(String),
    });
});

test.runIf(isDevelopment)('GET /api/v1/users/:id', async function() {
    const response = await request.agent(app)
        .get(`/api/v1/users/${user_id}`)
        .expect(200)
        .then((response) => {
            return response.body;
        });
    expect(response).toStrictEqual({
        _id: user_id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        created_at: expect.any(String),
        updated_at: expect.any(String),
    });
});

test.runIf(isDevelopment)('PUT /api/v1/users/:id', async function() {
    const response = await request.agent(app)
        .put(`/api/v1/users/${user_id}`)
        .send({
            first_name: 'updated user first_name',
            last_name: 'updated user last_name',
        })
        .expect(200)
        .then((response) => {
            return response.body;
        });
    expect(response).toStrictEqual({
        _id: user_id,
        first_name: 'updated user first_name',
        last_name: 'updated user last_name',
        email: user.email,
        created_at: expect.any(String),
        updated_at: expect.any(String),
    });
});

test.runIf(isDevelopment)('DELETE /api/v1/users/:id', async function() {
    await request.agent(app)
        .delete(`/api/v1/users/${user_id}`)
        .expect(204)
});

test.runIf(isDevelopment)('GET|PUT|DELETE /api/v1/users, should throw error "ID required"', async function() {
    await request.agent(app)
        .get('/api/v1/users')
        .expect(400)
    await request.agent(app)
        .put('/api/v1/users')
        .expect(400)
    await request.agent(app)
        .delete('/api/v1/users')
        .expect(400)
});

test.runIf(isDevelopment)('GET|PUT|DELETE /api/v1/users/1, should throw error "no user found with ID 1"', async function() {
    let getResponse;
    let putResponse;
    let deleteResponse;
    try {
        getResponse = await request.agent(app)
            .get('/api/v1/users/1')
    } catch (error) {
        expect(error).toBeInstanceOf(Error)
    }
    if (getResponse) {
        expect(getResponse.status).toBe(500);
        expect(JSON.parse(getResponse.text)).toStrictEqual({error:"No user found with ID 1"});
    }

    try {
        putResponse = await request.agent(app)
            .put('/api/v1/users/1')
    } catch (error) {
        expect(error).toBeInstanceOf(Error)
    }
    if (putResponse) {
        expect(putResponse.status).toBe(500);
        expect(JSON.parse(putResponse.text)).toStrictEqual({error:"No user found with ID 1"});
    }

    try {
        deleteResponse = await request.agent(app)
            .delete('/api/v1/users/1')
    } catch (error) {
        expect(error).toBeInstanceOf(Error)
    }
    if (deleteResponse) {
        expect(deleteResponse.status).toBe(500);
        expect(JSON.parse(deleteResponse.text)).toStrictEqual({error:"No user found with ID 1"});
    }
});