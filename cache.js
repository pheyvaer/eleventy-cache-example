const path = require('path');
const fs = require('fs-extra');

/**
 * This method returns a cached version if available, else it will get the data via the provided function.
 * @param getData The function that needs to be called when no cached version is available.
 * @param cacheFilename The filename of the file that contains the cached version.
 * @returns {Promise<null>}
 */
module.exports = async function(getData, cacheFilename) {
  // Check if the environment variable is set.
  const isServing = process.env.ELEVENTY_SERVE === 'true';
  const cacheFilePath = path.resolve(__dirname, '_data/_cache/' + cacheFilename);
  let dataInCache = null;

  // Check if the website is being served and that a cached version is available.
  if (isServing && await fs.pathExists(cacheFilePath)) {
    // Read file from cache.
    dataInCache = await fs.readJSON(cacheFilePath);
    console.log('Using from cache: ' + cacheFilename);
  }

  // If no cached version is available, we execute the function.
  if (!dataInCache) {
    const result = await getData();

    // If the website is being served, then we write the data to the cache.
    if (isServing) {
      // Write data to cache.
      fs.writeJSON(cacheFilePath, result, err => {
        if (err) {console.error(err)}
      });
    }

    dataInCache = result;
  }

  return dataInCache;
};
