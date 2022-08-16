const spawn = require('child_process').spawn;
const path = require('path');
const workspacePath = path.resolve(__dirname, './');

// workspace constants
const workspaceYoRcFile = require(path.join(workspacePath, '.yo-rc-workspace.json'));
const workspaceRepos = workspaceYoRcFile.frontendRepos || [];
// install
for (const repo of workspaceRepos) {
    spawn("ln", ['-s', `${workspacePath}/${repo}`, `${workspacePath}/node_modules/${repo}`]);
}
