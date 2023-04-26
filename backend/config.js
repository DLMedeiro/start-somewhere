"use strict";

require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY || "secret-dev";

const PORT = +process.env.PORT || 3001;

function getDatabaseUri() {
  return process.env.DATABASE_URL;
}
// function getDatabaseUri() {
//   return process.env.NODE_ENV === "test"
//     ? "war_test"
//     : process.env.DATABASE_URL || "war";
// }

// Speed up bcrypt during tests, since the algorithm safety isn't being tested
//

const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === 12;

module.exports = {
  SECRET_KEY,
  PORT,
  BCRYPT_WORK_FACTOR,
  getDatabaseUri,
};
