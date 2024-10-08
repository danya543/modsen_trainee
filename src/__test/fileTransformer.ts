/* eslint-disable */
const path = require('path');

module.exports = {
  //@ts-ignore
  process: (sourceText, sourcePath, options) => ({
    code: `module.exports = ${JSON.stringify(path.basename(sourcePath))}`,
  }),
};
