import { startSession } from "mongoose";

const withMongoTransaction = (fn) => async (req, res, next) => {
  const session = await startSession();
  req.mongoSession = session;

  try {
    let result;
    await session.withTransaction(async () => {
      result = await fn(req, res);
    });

    res.status(result.status || 200).json(result.body);
  } finally {
    await session.endSession();
  }
};

export default withMongoTransaction;
