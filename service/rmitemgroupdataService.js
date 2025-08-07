const { verifyToken, extractToken } = require('../middleware/tokenValidation');
const pool = require('../database/connection');


const itemGroup = async (req, res) => {
    try {
        const extract = extractToken(req);
        const decoded = verifyToken(extract);
        console.log("Token is valid:", decoded);
        console.log("service work correctly");
        const { item, item_group, is_taxable, is_stockable, status } = req.body;

        const sql = `
            INSERT INTO trn_items (item, item_group, is_taxable, is_stockable, status)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
        `;
        const values = [item, item_group, is_taxable, is_stockable, status];

        const { rows } = await pool.query(sql, values);
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(error.statusCode || 500).json({ message: error.message || "Internal Server Error" });
    }
};

module.exports = { itemGroup };
