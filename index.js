#!/usr/bin/env node

import { readdir, promises } from 'node:fs';
import { cwd } from 'node:process';
import chalk from 'chalk';
import path from 'node:path';

const { lstat } = promises;
const targetDir = process.argv[2] || process.cwd();

readdir(targetDir, async (err, files) => {
  if (err) throw new Error(err);

  const promises = files.map((file) => {
    return lstat(path.join(targetDir, file));
  });

  const allStats = await Promise.all(promises);

  for (let stat of allStats) {
    const index = allStats.indexOf(stat);

    // console.log(files[index], stat.isFile());

    if (stat.isFile()) console.log(chalk.blue(files[index]));
    else console.log(chalk.bold.red(files[index]));
  }

  //   for (let file of files) {
  //     try {
  //       const stats = await lstat(file);
  //       console.log(file, stats.isFile());
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   }
  // Figuring out what is a file and what is a folder
});
