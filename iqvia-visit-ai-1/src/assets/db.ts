import sql from "mssql";
import dotenv from "dotenv";

dotenv.config();

const config = {
  user: process.env.DB_USER, // Your Azure SQL username
  password: process.env.DB_PASS, // Your Azure SQL password
  server: process.env.DB_SERVER, // e.g. "yourserver.database.windows.net"
  database: process.env.DB_NAME, // Your database name
  options: {
    encrypt: true, // Azure requires encryption
    enableArithAbort: true,
  },
};

export async function queryDatabase(query: string) {
  try {
    await sql.connect(config);
    const result = await sql.query(query);
    return result.recordset;
  } catch (err) {
    console.error("SQL Error: ", err);
    throw err;
  } finally {
    sql.close();
  }
}


// Function to Insert Record
export async function insertRecord(name: string, email: string): Promise<void> {
    try {
      let pool = await sql.connect(config);
      let result = await pool
        .request()
        .input("name", sql.VarChar, name)
        .input("email", sql.VarChar, email)
        .query(`INSERT INTO Users (Name, Email) VALUES (@name, @email)`);
  
      console.log("Record Inserted:", result);
    } catch (error) {
      console.error("Error inserting record:", error);
    }
  }
