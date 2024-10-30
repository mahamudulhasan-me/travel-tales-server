import { PaymentModel } from "../payment/payment.model";
import PostModel from "../post/post.model";
import { UserModel } from "../user/user.model";

const getLast7DaysData = async () => {
  const today = new Date();
  const weekAgo = new Date();
  weekAgo.setDate(today.getDate() - 7);

  // Query for each model to get count grouped by day
  const userStats = await UserModel.aggregate([
    {
      $match: {
        createdAt: { $gte: weekAgo, $lte: today },
      },
    },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } }, // Sort by date ascending
  ]);

  const postStats = await PostModel.aggregate([
    {
      $match: {
        createdAt: { $gte: weekAgo, $lte: today },
      },
    },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  const paymentStats = await PaymentModel.aggregate([
    {
      $match: {
        createdAt: { $gte: weekAgo, $lte: today },
      },
    },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  // Create final array of objects for chart data
  const chartData = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    const dateString = date.toISOString().split("T")[0]; // Convert to YYYY-MM-DD

    const usersOnDate = userStats.find((stat) => stat._id === dateString);
    const postsOnDate = postStats.find((stat) => stat._id === dateString);
    const paymentsOnDate = paymentStats.find((stat) => stat._id === dateString);

    chartData.push({
      name: dateString,
      users: usersOnDate ? usersOnDate.count : 0,
      posts: postsOnDate ? postsOnDate.count : 0,
      payments: paymentsOnDate ? paymentsOnDate.count : 0,
    });
  }

  // Total counts from all data
  const totalUsers = await UserModel.countDocuments({});
  const totalPosts = await PostModel.countDocuments({});
  const totalPayments = await PaymentModel.countDocuments({});

  // Calculate the percentage change for users, posts, and payments
  const userCountLast7Days = userStats.reduce(
    (total, stat) => total + stat.count,
    0
  );
  const postCountLast7Days = postStats.reduce(
    (total, stat) => total + stat.count,
    0
  );
  const paymentCountLast7Days = paymentStats.reduce(
    (total, stat) => total + stat.count,
    0
  );

  const userChange = (
    ((userCountLast7Days - totalUsers) / totalUsers) *
    100
  ).toFixed(2);
  const postChange = (
    ((postCountLast7Days - totalPosts) / totalPosts) *
    100
  ).toFixed(2);
  const paymentChange = (
    ((paymentCountLast7Days - totalPayments) / totalPayments) *
    100
  ).toFixed(2);

  // Create final response object
  return {
    totals: {
      totalUsers,
      totalPosts,
      totalPayments,
      userChange: `${userChange}%`,
      postChange: `${postChange}%`,
      paymentChange: `${paymentChange}%`,
    },
    chartData: chartData.reverse(), // Include chart data
  };
};

const paymentReport = async () => {
  // Get today's date and calculate the date 7 days ago
  const today = new Date();
  // today.setHours(0, 0, 0, 0); // Set the time to the start of the day

  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 7); // Subtract 7 days

  // Query to count users registered per day in the last 7 days
  const userAggregation = await UserModel.aggregate([
    {
      $match: {
        createdAt: { $gte: sevenDaysAgo, $lt: today },
      },
    },
    {
      $group: {
        _id: {
          $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
        },
        count: { $sum: 1 },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);

  // Query to sum payment amounts and count transactions per day in the last 7 days
  const paymentAggregation = await PaymentModel.aggregate([
    {
      $match: {
        createdAt: { $gte: sevenDaysAgo, $lt: today },
        paymentStatus: "paid", // Only include successful payments
      },
    },
    {
      $group: {
        _id: {
          $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
        },
        totalAmount: { $sum: "$amount" },
        transactionCount: { $sum: 1 }, // Count the number of transactions
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);

  // Merge the results into a single report for each day
  const report = [];
  const days = 7;

  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const formattedDate = date.toISOString().split("T")[0]; // Format date as YYYY-MM-DD

    const userCount =
      userAggregation.find((u) => u._id === formattedDate)?.count || 0;
    const paymentData = paymentAggregation.find(
      (p) => p._id === formattedDate
    ) || {
      totalAmount: 0,
      transactionCount: 0,
    };

    report.push({
      date: formattedDate,
      newUsers: userCount,
      totalPayment: paymentData.totalAmount,
      transactionCount: paymentData.transactionCount, // Include transaction count
    });
  }

  // Reverse the report array to show the oldest date first
  report.reverse();
  return report;
};

export const ReportService = {
  getLast7DaysData,
  paymentReport,
};
