const os = require('os');
const { execSync } = require('child_process');
const { getInput, setFailed, setOutput } = require('@actions/core');
const fs = require('fs');

try {
    console.log("Starting VM launch");
} catch (error) {
    setFailed(error.message);
}