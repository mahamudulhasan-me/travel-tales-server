import asyncHandler from "../../utils/asyncHandler";
import sendResponse from "../../utils/sendResponse";
import { ReportService } from "./report.service";

const sevenDaysAnalytics = asyncHandler(async (req, res) => {
  const result = await ReportService.getLast7DaysData();

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Data retrieved successfully",
    data: result,
  });
});

export const ReportController = {
  sevenDaysAnalytics,
};
