/* eslint-disable no-console */
const fsExtra = require('fs-extra');
const path = require('path');

// Copies a file from the root repository into the `./dist` directory.
async function copyFile(filename, destinationFilename = null) {
  const dist = path.resolve(__dirname, '../dist/', destinationFilename || path.basename(filename));
  await fsExtra.copy(filename, dist);
  console.log(`Copied ${filename} to ${dist}`);
}

/**
 * Copies the package.json to the `./dist` directory and then edits the
 * main/modules entries in the package.json to remove the `dist` portion. This
 * allows for the `dist` directory to be published to npm or github package repo.
 * The original package.json must have the `dist` portion of the path otherwise
 * the package won't work inside workspace directories locally since the root
 * directory is what is linked via yarn workspace not the dist directory.
 */
async function copyPackageJson() {
  const packageJson = await fsExtra.readFile(path.resolve(__dirname, '../package.json'), 'utf8');
  const { scripts, devDependencies, files, ...packageDataOther } = JSON.parse(packageJson);

  const newPackageJson = {
    ...packageDataOther,
    main: './index.js',
    module: './index.es.js',
  };

  const output = path.resolve(__dirname, '../dist/package.json');

  await fsExtra.writeFile(output, JSON.stringify(newPackageJson, null, 2), 'utf8');
  console.log(`Created ${output}`);
}

/**
 * Copies files from the root of the project into the built dist directory
 * that are needed for the dist to be a publishable package to npm for github
 * package repo.
 *
 * Copies package.json, index.js, README, CHANGELOG, and LICENSE.
 */
async function run() {
  try {
    await copyFile('./LICENSE');
    await copyFile('./CHANGELOG.md');
    await copyFile('./README.md');
    await copyFile('./src/index.js', 'index.es.js');
    await copyPackageJson();
  } catch (error) {
    console.error('Copy failed', error);
  }
}

run();
