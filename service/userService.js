const {generateAccessToken,generateRefreshToken,refreshTokens} = require('../middleware/tokenValidation');

const users = [
  { username: 'a', password: 'a' },
  { username: 'b', password: 'b' },
  { username: 'c', password: 'c' },
];


const login = (req, res) => {
  console.log('Login attempt:', req.body);
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);


  if (user) {
    const payload = { username: user.username };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);
    refreshTokens[user.username] = refreshToken;

    console.log({ accessToken, refreshToken });
    return res.json({ message: 'Logged in successfully', accessToken, refreshToken });
  }

  return res.status(401).json({ message: 'Invalid Credentials' });
};


module.exports = { login };

