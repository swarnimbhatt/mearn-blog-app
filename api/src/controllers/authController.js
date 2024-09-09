const authService = require('../services/authService');
const fileService = require('../services/fileService');

exports.login = async (req, resp) => {
  const { username, password } = req.body;
  try {
    const { token, user } = await authService.login(username, password);
    resp.cookie("token", token).json(user);
  } catch (err) {
    resp.status(400).json(err.message);
  }
};

exports.register = async (req, resp) => {
  const { originalname, path } = req.file;
  const newPath = fileService.renameUploadedFile(path, originalname);
  
  try {
    const userDoc = await authService.register(req.body, newPath);
    resp.json(userDoc);
  } catch (err) {
    resp.status(400).json(err.message);
  }
};

exports.profile = (req, resp) => {
  const { token } = req.cookies;
  if (!token) return resp.status(401).json("Unauthorized");

  authService.verifyToken(token)
    .then(info => {
      // fetch user data
      resp.json(info);
    })
    .catch(err => resp.status(400).json(err.message));
};
