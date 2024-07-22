import request from "supertest";
import { expect } from "chai";
import mongoose from "mongoose";
import app from "../src/app.js";
import config from "../src/config/index.js";

describe("Tasks API", function () {
  before(function (done) {
    mongoose
      .connect(config.MONGODB_URL)
      .then(() => done())
      .catch(done);
  });

  after(function (done) {
    mongoose.connection.close(done);
    done();
  });

  let taskId;

  it("should create a new task", function (done) {
    request(app)
      .post("/api/create-tasks")
      .send({
        title: "Test Task",
        description: "This is a test task",
        priorityStatus: "LOW",
        dueDate: "2024-12-31",
      })
      .set("Accept", "application/json")
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.success).to.be.true;
        expect(res.body.task).to.have.property("_id");
        taskId = res.body.task._id;
        done();
      });
  });

  it("should get a list of tasks", function (done) {
    request(app)
      .get("/api/all-tasks")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.success).to.be.true;
        expect(res.body.task).to.be.an("array");
        done();
      });
  });

  it("should get a task by id", function (done) {
    request(app)
      .get(`/api/get-tasks-by-id/${taskId}`)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body._id).to.equal(taskId);
        done();
      });
  });

  it("should update a task", function (done) {
    request(app)
      .put(`/api/update-tasks/${taskId}`)
      .send({
        title: "Updated Test Task",
        description: "This is an updated test task",
        priorityStatus: "MEDIUM",
        dueDate: "2025-12-31",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.success).to.be.true;
        done();
      });
  });

  it("should delete a task", function (done) {
    request(app)
      .delete(`/api/delete-tasks/${taskId}`)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.success).to.be.true;
        done();
      });
  });
});
