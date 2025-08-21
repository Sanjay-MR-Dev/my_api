const pool = require('../database/connection');
const { verifyToken, extractToken } = require('../middleware/tokenValidation');

const updatermItemMaster = async (req, res) => {
  try {
    const extract = extractToken(req);
    const decoded = verifyToken(extract);
    console.log("Token is valid:", decoded);
    console.log("Update Item Group Service work correctly");
    const { item,item_group,is_taxable,is_stockable,status,olditem } = req.body;

    const sql = `
        Update trn_items
        SET item = $1,
        item_group = $2,
        is_taxable = $3,
        is_stockable = $4,
        status = $5
        Where item  = $6
        RETURNING *`;

    const values = [item,item_group,is_taxable,is_stockable,status,olditem];
    const { rows } = await pool.query(sql, values);
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(error.statusCode || 500).json({ message: error.message || "Internal Server Error" });

  }
};

module.exports = { updatermItemMaster };