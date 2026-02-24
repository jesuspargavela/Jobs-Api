const express = require("express");

const router = express.Router();

const jobsController = require("../controllers/JobsController");

//Get all jobs
router.get("/", jobsController.getJobs);

//Get job based on id
router.get("/:id", jobsController.getJob);

//Create a job
router.post("/", jobsController.createJob);

//Update a job based on id
router.put("/:id", jobsController.updateJob);

//Delete a job based on id
router.delete("/:id", jobsController.deleteJob);

module.exports = router;
