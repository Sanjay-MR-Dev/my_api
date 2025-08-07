const { verifyToken, extractToken } = require('../middleware/tokenValidation');
const pool = require('../database/connection');


const addrmItemGroup = async (req, res) => {
    try {
        const extract = extractToken(req);
        const decoded = verifyToken(extract);
        console.log("Token is valid:", decoded);
        console.log("service work correctly");
        const {item_group} = req.body;

        const sql = `INSERT INTO trn_item_group (item_group) VALUES ($1) RETURNING*;`;

        const values = [item_group];
        const { rows } = await pool.query(sql,values);
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(error.statusCode || 500).json({ message: error.message || "Internal Server Error" });
    }
};

module.exports = { addrmItemGroup };
