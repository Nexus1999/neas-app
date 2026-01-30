// lib/db.ts
import mysql from "mysql2/promise";
import fs from "fs";
import path from "path";

const caPath = path.join(process.cwd(), "lib", "ca.pem");

if (!fs.existsSync(caPath)) {
  console.error("❌ SSL cert not found at:", caPath);
  process.exit(1);
}

const pool = mysql.createPool({
  host: process.env.DB_HOST,        // e.g. mysql-16beb4d2-neas.k.aivencloud.com
  port: Number(process.env.DB_PORT),// e.g. 12475
  user: process.env.DB_USER,        // e.g. avnadmin
  password: process.env.DB_PASS,    // your Aiven password
  database: process.env.DB_NAME,    // e.g. defaultdb
  waitForConnections: true,
  connectionLimit: 10,
  ssl: {
    ca: fs.readFileSync(caPath),
  },
});

export default pool;
