const fs = require('fs');
const path = require('path');

exports.renameUploadedFile = (filePath, originalName) => {
  const fileExtension = originalName.split('.').pop();
  const newPath = `${filePath}.${fileExtension}`;
  fs.renameSync(filePath, newPath);
  return newPath;
};

exports.deleteFile = (filePath) => {
  fs.unlinkSync(filePath);
};
