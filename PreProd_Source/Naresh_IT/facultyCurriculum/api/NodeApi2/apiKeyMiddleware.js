const validApiKeys = ['test45']; // Store API keys securely in a real application

const apiKeyMiddleware = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  console.log("Headers:", req.headers); // Debug output to see headers
  console.log("API Key:", apiKey); // Debug output to see the API key
  if (validApiKeys.includes(apiKey)) {
    next();
  } else {
    res.status(403).json({ message: 'Forbidden' });
  }
};

module.exports = apiKeyMiddleware;
