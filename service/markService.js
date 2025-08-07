const pool = require('../database/connection');
const {verifyToken,extractToken} = require('../middleware/tokenValidation');

const markUpdate = async (req, res) => {
    try {
        const extract = extractToken(req);
        const decoded = verifyToken(extract);   
        console.log("Token is valid:", decoded);
        console.log("service work correctly");
        const {dept,data} = req.body;
    
        const sql = `INSERT INTO mark(dept,name,register_number,tamil,english,maths,science,social,total_marks)
                SELECT $1::Text As dept,
                name,
                register_number,
                tamil,english,maths,science,social,
                (tamil+english+maths+science+social) as total_marks
                from json_to_recordset($2::json)
                as t(
                name Text,register_number BIGINT,
                tamil BIGINT,english BIGINT,
                maths BIGINT,science BIGINT,
                social BIGINT
                )RETURNING * `;


      const {rows} = await pool.query(sql,[dept, JSON.stringify(data)]);
      res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(error.statusCode || 500).json({ message: error.message || "Internal Server Error" });
    }
};


module.exports = { markUpdate };
