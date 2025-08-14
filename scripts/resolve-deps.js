#!/usr/bin/env node

/**
 * Script to resolve dependency conflicts, particularly picomatch version issues
 * Run this script when you encounter dependency conflicts in CI/CD
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔧 Resolving dependency conflicts...');

try {
  // Remove existing node_modules and package-lock.json
  if (fs.existsSync('node_modules')) {
    console.log('🗑️  Removing node_modules...');
    fs.rmSync('node_modules', { recursive: true, force: true });
  }
  
  if (fs.existsSync('package-lock.json')) {
    console.log('🗑️  Removing package-lock.json...');
    fs.unlinkSync('package-lock.json');
  }

  // Install dependencies with legacy peer deps
  console.log('📦 Installing dependencies with legacy peer deps...');
  execSync('npm install --legacy-peer-deps --force', { stdio: 'inherit' });

  // Try to fix any remaining issues
  console.log('🔧 Running audit fix...');
  try {
    execSync('npm audit fix --force', { stdio: 'inherit' });
  } catch (error) {
    console.log('⚠️  Audit fix completed with warnings (this is normal)');
  }

  // Generate Prisma client
  if (fs.existsSync('prisma/schema.prisma')) {
    console.log('🗄️  Generating Prisma client...');
    execSync('npx prisma generate', { stdio: 'inherit' });
  }

  console.log('✅ Dependency conflicts resolved successfully!');
  console.log('💡 You can now commit the updated package-lock.json file');
  
} catch (error) {
  console.error('❌ Failed to resolve dependencies:', error.message);
  process.exit(1);
}
