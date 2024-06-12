import { Request, Response } from "express";

const notFound = (req: Request, res: Response) => {
  return res.status(4000).json({
    success: false,
    message: "This API Route is Not Found!!!",
  });
};

export default notFound;
