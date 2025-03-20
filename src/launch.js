const os = require('os');
const { execSync } = require('child_process');
const { getInput, setFailed, setOutput } = require('@actions/core');
const fs = require('fs');

try {
    console.log("Starting VM launch");
    const incusRemote = getInput('incus_remote');
    const incusImage = getInput('incus_image');
    const cpuCores = getInput('cpu_cores');
    const memory = getInput('memory');
    const diskSize = getInput('disk_size');
    const incusProfile = getInput('incus_profile');
    const incusProject = getInput('incus_project');
    const vmName = getInput('vm_name');
    const vmDescription = getInput('vm_description');

    console.log(`incus_remote: ${incusRemote}`);
    console.log(`incus_image: ${incusImage}`);
    console.log(`cpu_cores: ${cpuCores}`);
    console.log(`memory: ${memory}`);
    console.log(`disk_size: ${diskSize}`);
    console.log(`incus_profile: ${incusProfile}`);
    console.log(`vm_name: ${vmName}`);
    console.log(`vm_description: ${vmDescription}`);

    // spawn new VM
    var spawnCmd = `sudo incus launch `;
    spawnCmd += `${incusRemote}:${incusImage} `;
    spawnCmd += `${incusRemote}:${vmName} `;
    spawnCmd += `--project ${incusProject} `;
    spawnCmd += `--profile ${incusProfile} `;
    spawnCmd += `--description "${vmDescription}" `;
    spawnCmd += `-c limits.cpu=${cpuCores} `;
    spawnCmd += `-c limits.memory=${memory}GiB `;
    spawnCmd += `-d root,size=${diskSize}GiB `;
    spawnCmd += `--vm`;
    console.log(`spawnCmd: ${spawnCmd}`);

    execSync(spawnCmd, { stdio: 'inherit' });

    // get VM IP
    var getIpCmd = `sudo incus info ${incusRemote}:${vmName} --project ${incusProject} `;
    getIpCmd += `| awk '/inet: / {print $2}' | grep -v  "127.0.0.1" | cut -d'/' -f1"`;
    console.log(`getIpCmd: ${getIpCmd}`);
    var ip = execSync(getIpCmd, { stdio: 'pipe' }).toString().trim();
    const retries = 30;
    var retry = 0;
    while (ip === "") {
        console.log("Waiting for VM to be ready...");
        ip = execSync(getIpCmd, { stdio: 'pipe' }).toString().trim();
        retry++;
        if (retry === retries) {
            throw new Error("Failed to get IP address");
        }
        sleep(4000);
    }
    // set IP as output
    setOutput('incus_vm_ip', ip);
    console.log(`VM IP: ${ip}`);
} catch (error) {
    setFailed(error.message);
}