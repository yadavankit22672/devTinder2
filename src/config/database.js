const mongoose = require("mongoose");
const dns = require("dns");

// Fix for "querySrv ECONNREFUSED" on Windows with IPv6 DNS
dns.setServers(['8.8.8.8', '8.8.4.4']);
const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://ankitrao380_db_user:umIr3lOGZA0lCGZq@cluster0.h6rg2cw.mongodb.net/devTinder",
  );
  console.log(`MongoDB Connected`);
};

module.exports = connectDB