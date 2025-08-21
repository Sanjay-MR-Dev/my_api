const pool = require('../database/connection');
const { verifyToken, extractToken } = require('../middleware/tokenValidation');


const updatermItemGroup = async (req, res) => {
  try {
    const extract = extractToken(req);
    const decoded = verifyToken(extract);
    console.log("Token is valid:", decoded);
    console.log("Update Item Group Service work correctly");
    const { item_group, olditem } = req.body;

    const sql = `
        Update trn_item_group
        SET item_group = $1
        Where item_group = $2
        RETURNING *`;

    const values = [item_group, olditem];
    const { rows } = await pool.query(sql, values);
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(error.statusCode || 500).json({ message: error.message || "Internal Server Error" });
  }
};

module.exports = { updatermItemGroup };
