const {verifyToken,extractToken} = require('../middleware/tokenValidation');
const pool = require('../database/connection');


const bulkInsertBills = async (req, res) => {
    try {
        const extract = extractToken(req);
        const decoded = verifyToken(extract);   
        console.log("Token is valid:", decoded);
        console.log("service work correctly");
        const { pos_ie_billid, items } = req.body;

        const sql = `
            INSERT INTO trn_pos_bill_items (pos_ie_billid, pos_ie_itemid, pos_ie_quantity, pos_ie_price, pos_ie_amount)
            SELECT $1::pos_ie_billid BIGINT,   //--> bigint pos-ie_billiid
                   pos_ie_itemid,
                   pos_ie_quantity,
                   pos_ie_price,
                   pos_ie_amount
            FROM json_to_recordset($2::json)
            AS t (
                pos_ie_itemid BIGINT,
                pos_ie_quantity DOUBLE PRECISION,
                pos_ie_price DOUBLE PRECISION,
                pos_ie_amount DOUBLE PRECISION
            ) RETURNING *`;

        const { rows } = await pool.query(sql, [pos_ie_billid, JSON.stringify(items)]);
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(error.statusCode || 500).json({ message: error.message || "Internal Server Error" });
    }
};

module.exports = { bulkInsertBills };
