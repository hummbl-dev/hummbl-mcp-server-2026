#!/usr/bin/env node
import { assertSchemaIntegrity } from './ajv.js';

try {
  assertSchemaIntegrity();
  console.log('Schema integrity check passed.');
  process.exit(0);
} catch (err) {
  console.error('Schema integrity check failed:', err);
  process.exit(1);
}
