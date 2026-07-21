import mysql from "mysql2/promise";

let pool: mysql.Pool | null = null;

export async function getDbPool() {
  if (pool) return pool;

  const host = process.env.MYSQL_HOST || "localhost";
  const port = parseInt(process.env.MYSQL_PORT || "3306");
  const user = process.env.MYSQL_USER || "root";
  const password = process.env.MYSQL_PASSWORD || "";
  const database = process.env.MYSQL_DATABASE || "kicktime";

  console.log(`Connecting to MySQL at ${host}:${port} as ${user}...`);

  try {
    // 1. First connect without database to ensure database exists
    const tempConnection = await mysql.createConnection({
      host,
      port,
      user,
      password,
    });

    await tempConnection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\``);
    await tempConnection.end();

    // 2. Create the connection pool with database selected
    pool = mysql.createPool({
      host,
      port,
      user,
      password,
      database,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0,
    });

    // 3. Initialize tables inside database
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS bookings (
        id VARCHAR(50) PRIMARY KEY,
        date VARCHAR(10) NOT NULL,
        time_slot VARCHAR(20) NOT NULL,
        student_name VARCHAR(100) NOT NULL,
        student_class VARCHAR(50) NOT NULL,
        status VARCHAR(30) DEFAULT 'Menunggu Pembayaran',
        amount INT DEFAULT 50000,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `;

    await pool.query(createTableQuery);

    // Migration logic: add columns if they don't exist in existing tables
    try {
      await pool.query("ALTER TABLE bookings ADD COLUMN status VARCHAR(30) DEFAULT 'Menunggu Pembayaran'");
    } catch (e) {
      // Column already exists, ignore
    }
    try {
      await pool.query("ALTER TABLE bookings ADD COLUMN amount INT DEFAULT 50000");
    } catch (e) {
      // Column already exists, ignore
    }

    console.log("MySQL connection established & schema verified successfully.");
    
    return pool;
  } catch (error) {
    console.error("Failed to connect to MySQL or initialize schema:", error);
    throw error;
  }
}

// Helper to run query easily
export async function query(sql: string, params?: any[]) {
  try {
    const dbPool = await getDbPool();
    const [results] = await dbPool.query(sql, params);
    return results;
  } catch (error) {
    console.error(`Database query error [${sql}]:`, error);
    throw error;
  }
}
