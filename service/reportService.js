const pool = require('../database/connection');
const { verifyToken, extractToken } = require('../middleware/tokenValidation');



const getDayAnalyse = async (req, res) => {

    try {
        const extract = extractToken(req);
        const decoded = verifyToken(extract);
        console.log("Token is valid:", decoded);

        console.log("service work correctly");
        const { outletId, orderType, startDate, endDate } = req.body;

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 1;
        const offset = (page -1) * limit ;  


        const sql =
            `SELECT
             TO_CHAR(pos_b_billing_date,'DD-MM-YYYY') as billing_date,
             COUNT(pos_b_billid) as no_of_bill,
             CAST(SUM(pos_b_sub_total) AS DECIMAL(32,2)) AS sub_total,
             CAST(SUM(pos_b_disc_amount) AS DECIMAL(32,2)) AS total_discount,
             CAST(SUM(pos_b_total_tax_amount) AS DECIMAL(32,2)) AS total_tax,
             CAST(SUM(pos_b_total_amount) AS DECIMAL(32,2)) AS total_amount
            FROM trn_pos_bill 
            WHERE 
            (pos_b_outletid = $1 or $1 = 0) and
            (pos_b_actual_order_type::INT = $2 or $2 = 0) AND
            pos_b_billing_date BETWEEN $3 and $4
            GROUP BY pos_b_billing_date
			order by pos_b_billing_date
			limit $5 offset $6`;


        const values = [outletId, orderType, startDate, endDate, limit, offset];
        const { rows } = await pool.query(sql, values);
        res.status(200).json(rows);

    } catch (error) {
        console.log("Error fetching Report:", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

module.exports = { getDayAnalyse };

