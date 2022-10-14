const mongoose = require("mongoose");
const Article = require("./models/articleModel");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb://localhost:27017/articles");
    console.log(`DB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

const seedArticles = [
  {
    title: "Qui unde voluptate doloremque ea.",
    description:
      "Provident repudiandae et quisquam. Sed soluta accusantium odio suscipit rem maxime. Similique sed quam sunt dolorem repellat perferendis",
    author: "Alice Mann",
    address: "Port Hadleystad",
  },
  {
    title: "Quas laudantium fuga.",
    description:
      "Provident repudiandae et quisquam. Sed soluta accusantium odio suscipit rem maxime. Similique sed quam sunt dolorem repellat perferendis",
    author: "Heather Harris",
    address: "East Sheridanbury",
  },
];

Article.insertMany(seedArticles)
  .then((res) => {
    console.log(res);
  })
  .catch((e) => {
    console.log(e);
  });

module.exports = connectDB;
