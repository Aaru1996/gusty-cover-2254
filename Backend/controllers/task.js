const Job = require("../models/Task");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllJobs = async (req, res) => {
  const { page = 1, limit = 3, type = "name", sort = 1 } = req.query;

  const allJobs = await Job.find();

  if (type == "name") {
    const jobs = await Job.find({ createdBy: req.user.userId })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      // .sort(`{${type}: ${Number(sort)}}`);
      .sort({ name: Number(sort) });
    res.status(StatusCodes.OK).json({ jobs, count: allJobs.length });
  }
  if (type == "deadline") {
    const jobs = await Job.find({ createdBy: req.user.userId })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      // .sort(`{${type}: ${Number(sort)}}`);
      .sort({ deadline: Number(sort) });
    res.status(StatusCodes.OK).json({ jobs, count: allJobs.length });
  }
};

const getJob = async (req, res) => {
  // here jobId is the alias for id
  const {
    user: { userId },
    params: { id: jobId },
  } = req;
  // we are checking for _id and createdBy at the same time just to have more security
  const job = await Job.findOne({ _id: jobId, createdBy: userId });
  if (!job) {
    throw new NotFoundError(`No job found with ${jobId} id`);
  }

  res.status(StatusCodes.OK).json({ job });
};

const createJob = async (req, res) => {
  // next line means we are adding one more property on req.body as createdBy
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

const updateJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
    body: { company, position },
  } = req;

  if (company == "" || position == "") {
    throw new BadRequestError("Company or Postion cannot be empty");
  }
  const job = await Job.findOneAndUpdate(
    { _id: jobId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );

  if (!job) {
    throw new NotFoundError(`No job found with ${jobId} id`);
  }

  res.status(StatusCodes.OK).json({ job });
};

const deleteJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;

  const job = await Job.findOneAndRemove({ _id: jobId, createdBy: userId });

  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }

  res.status(StatusCodes.OK).json({ job });
};

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};
