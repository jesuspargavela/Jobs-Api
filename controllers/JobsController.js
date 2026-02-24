let jobs = require("../models/Job");

const { v4: uuid } = require("uuid");

//Get all jobs
const getJobs = (req, res, next) => {
    const limit = +req.query.limit;

    if (!isNaN(limit) && limit > 0) {
        return res.status(200).json({ jobs: jobs.slice(0, limit) });
    }

    res.status(200).json({ jobs });
}

//Get job based on an id
const getJob = (req, res, next) => {
    const id = req.params.id;

    const job = jobs.find(j => id === j.id);

    if (!job) {
        const error = new Error('Job with ID ' + id + ' not found');
        error.status = 404;
        return next(error);
    }

    res.status(200).json({ job });
}

//Create a job based
const createJob = (req, res, next) => {
    const {
        type,
        title,
        description,
        salary,
        location,
        company_name,
        company_description,
        contact_email,
        contact_phone
    } = req.body;

    if (!type || !title || !description || !salary || !location || !company_name || !company_description || !contact_email || !contact_phone) {
        const error = new Error('All fields are required');
        error.status = 400;
        return next(error);
    }

    const newJob = {
        id: uuid(),
        type,
        title,
        description,
        salary,
        location,
        company_name,
        company_description,
        contact_email,
        contact_phone
    }

    jobs.push(newJob);

    res.status(201).json({ job: newJob });
}

//Update job based on an id
const updateJob = (req, res, next) => {
    const id = req.params.id;

    const job = jobs.find(j => id === j.id);

    if (!job) {
        const error = new Error('Job with ID ' + id + ' not found');
        error.status = 404;
        return next(error);
    }

    const updatedJob = { id, ...req.body };

    jobs = jobs.map(j => {
        if (j.id === id) {
            return updatedJob;
        }
    });

    res.status(200).json({ job: updatedJob });
}

//Delete job based on an id
const deleteJob = (req, res, next) => {
    const id = req.params.id;

    const job = jobs.find(j => id === j.id);

    if (!job) {
        const error = new Error('Job with ID ' + id + ' not found');
        error.status = 404;
        return next(error);
    }

    jobs = jobs.filter(j => id !== j.id);

    res.status(200).json({ id });
}

module.exports = {
    getJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}
