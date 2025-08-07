const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_jwt_secret_key';
const REFRESH_SECRET = 'your_refresh_secret_key';
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });

class ApiError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
    }
}


let refreshTokens = {};

const generateAccessToken = (payload) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
}

const generateRefreshToken = (payload) => {
    return jwt.sign(payload, REFRESH_SECRET, { expiresIn: '10h' });
}

const refreshTokenRoutes = (app) => {
    app.post('/api/refresh-tokens', (req, res) => {
        const { refreshToken } = req.body;
        console.log(refreshToken, "inside refresh api call");


        if (!refreshToken) {
            return res.status(403).json({ message: 'No refresh token provided' });
        }

        try {
            const decoded = jwt.verify(refreshToken, REFRESH_SECRET);
            console.log(decoded,"refresh");
            const storedToken = refreshTokens[decoded.username];
            console.log(storedToken,"stored Token");

            if (refreshToken !== storedToken) {
                return res.status(403).json({ message: 'Refresh token mismatch. Login again.' });
            }

            const payload = { username: decoded.username };
            const newAccessToken = generateAccessToken(payload);
            const newRefreshToken = generateRefreshToken(payload);

            refreshTokens[decoded.username] = newRefreshToken;
            return res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken });


        } catch (error) {
            console.log("Invalid Refresh Token",error);
            return res.status(403).json({ message: 'Invalid or expired refresh token' });
        }
    });


app.post('/api/protected', csrfProtection, (req, res) => {
    res.json({ message: 'Secure route accessed' });
});


app.get('/api/csrf-token', csrfProtection, (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    res.status(200).json({ message: 'CSRF token set' });
});

}


const extractToken = (req) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log("Token is missing or malformed");
        throw new ApiError(401, 'Authorization header is missing or malformed');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        console.log("Token Part missing after Bearer")
        throw new ApiError(401, 'Token not found in Authorization header');
    }
    return token;

};


const verifyToken = (token) => {
    if (!token) {
        throw new ApiError(401, 'Access Token required');
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded;
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            console.error(`Token Expired: ${error.stack || error.message}`);
            throw new ApiError(401, 'Token is Expired');
        }
        else {
            console.error(`Token Invalid: ${error.stack || error.message}`);
            throw new ApiError(401, "Invalid Token");

        }
    }
};

module.exports = {
    verifyToken,
    extractToken,
    generateAccessToken,
    refreshTokenRoutes,
    generateRefreshToken,
    refreshTokens,
    
};

