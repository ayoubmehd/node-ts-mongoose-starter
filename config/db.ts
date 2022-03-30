import { connect } from "mongoose";

export default function main() {
  return connect(
    process.env.MDB_CONN || "mongodb://localhost:27017/tanger-med-tech"
  );
}
