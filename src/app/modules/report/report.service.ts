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

export const ReportService = {
  getLast7DaysData,
};
