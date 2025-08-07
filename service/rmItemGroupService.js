const { verifyToken, extractToken } = require('../middleware/tokenValidation');
const pool = require('../database/connection');


const rmItemGroup = async (req, res) => {
    try {
        const extract = extractToken(req);
        const decoded = verifyToken(extract);
        console.log("Token is valid:", decoded);
        console.log("service work correctly");

        const sql = `SELECT * FROM trn_items;`;
        
        const { rows } = await pool.query(sql);
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(error.statusCode || 500).json({ message: error.message || "Internal Server Error" });
    }
};

module.exports = { rmItemGroup };
