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

    console.log(`incus_remote: ${incusRemote}`);
    console.log(`incus_image: ${incusImage}`);
    console.log(`cpu_cores: ${cpuCores}`);
    console.log(`memory: ${memory}`);
    console.log(`disk_size: ${diskSize}`);
    console.log(`incus_profile: ${incusProfile}`);  
    console.log(`incus_project: ${incusProject}`);



//     incus_remote:
//     description: 'Name of the Incus remote'
//     required: true
//   incus_image:
//     description: 'Name of the Incus image'
//     required: false
//     default: 'images:ubuntu/22.04/cloud'
//   cpu_cores:
//     description: 'Number of CPU cores'
//     required: false
//     default: '1'
//   memory:
//     description: 'Amount of memory in GiB'
//     required: false
//     default: '2'
//   disk_size:
//     description: 'Size of the disk in GiB'
//     required: false
//     default: '10'
//   incus_profile:
//     description: 'Name of the Incus profile'
//     required: false
//     default: 'default'
//   incus_project:
//     description: 'Name of the Incus project'
//     required: false
//     default: 'default'
//   cleanup:
//     description: 'Whether to cleanup the VM after the action'
//     required: false
//     default: 'false'
//   snapshot:
//     description: 'Whether to create a snapshot of the VM'
//     required: false
//     default: 'false'
} catch (error) {
    setFailed(error.message);
}