#!/usr/bin/env node

import { readdir } from 'node:fs';
import { cwd } from 'node:process';

readdir(cwd(), (err, files) => {
  if (err) throw new Error(err);
  console.log(files);
});
