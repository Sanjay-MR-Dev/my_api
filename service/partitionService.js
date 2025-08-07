const pool = require('../database/connection');
const { verifyToken, extractToken } = require('../middleware/tokenValidation');

const partition = async (req, res) => {
    
    try {
        const extract = extractToken(req);
        const decoded = verifyToken(extract);
        console.log("Token is valid:", decoded);
        console.log("service work correctly");

        const { date, name, total_marks } = req.body;

        await pool.query('BEGIN');
        const sql = `INSERT INTO logs_staging(date,name,total_marks) VALUES ($1,$2,$3) RETURNING *`;

        const values = [date, name, total_marks];
        const { rows } = await pool.query(sql, values);
        await pool.query('COMMIT');
        res.status(200).json(rows);

    } catch (error) {
        await pool.query('ROLLBACK');
        console.error(error);
        res.status(error.statusCode || 500).json({ message: error.message || "Internal Server Error" });
    }
};

module.exports = { partition };
