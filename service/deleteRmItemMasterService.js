const pool = require('../database/connection');
const { verifyToken, extractToken } = require('../middleware/tokenValidation');


const deletermItemMaster = async (req, res) => {
    try {
        const extract = extractToken(req);
        const decoded = verifyToken(extract);
        console.log("Token is valid:", decoded);
        console.log("Delete RmItemMaster service work correctly");
        const { item } = req.body;

        const sql = `DELETE FROM trn_items 
                    WHERE item = $1
                    RETURNING *`;

        const { rows } = await pool.query(sql, [item]);
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(error.statusCode || 500).json({ message: error.message || "Internal Server Error" });
    }
};

module.exports = { deletermItemMaster };


