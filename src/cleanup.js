const os = require('os');
const { execSync } = require('child_process');
const { getInput, setFailed, setOutput } = require('@actions/core');
const fs = require('fs');

try {
    console.log("Starting cleanup");
    const cleanUp = getInput('cleanup');
    const snapshot = getInput('snapshot');

    console.log(`cleanup: ${cleanUp}`);
    console.log(`snapshot: ${snapshot}`);
        
} catch (error) {
    setFailed(error.message);
}