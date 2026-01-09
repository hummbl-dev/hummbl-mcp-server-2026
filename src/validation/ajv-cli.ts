#!/usr/bin/env node
/* global console, process */
/* eslint-disable no-console */
import { assertSchemaIntegrity } from './ajv.js';

try {
  assertSchemaIntegrity();
  console.log('Schema integrity check passed.');
  process.exit(0);
} catch (err) {
  console.error('Schema integrity check failed:', err);
  process.exit(1);
}
