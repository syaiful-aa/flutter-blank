import { message, danger, fail, warn } from 'danger'

/// constant variables
const clickupRegex = /(clickup\.com\/[^ "])/g;
const ignoredFileTypeRegex = /\.svg|\.svg|\.g.dart/i;
const maxLinesOfCode = 700;

const pullRequestHeadRef = danger.github.pr.head.ref;
const ignoredBranch = /^release\/.*|^feature\/.*|^sync\/.*/g;

if (!danger.github.pr.body.includes("Summary")) {
    fail("Please give little explanation in the description of what changes you made");
}

if (!clickupRegex.test(danger.github.pr.body)) {
    fail("Please put the clickup link related to this changes");
}

if (!ignoredBranch.test(pullRequestHeadRef)) {
    checkLineOfChanges().then(loc => {
        if (loc > maxLinesOfCode) {
            fail('Changes are too large, Please split up this pull request to make it easier to review');
        }
    });
}

function getFileName(filePath) {
    return filePath.split("/").slice(-1);
}

async function checkLineOfChanges() {
    const modifiedFiles = danger.git.modified_files.filter(filePath => !ignoredFileTypeRegex.test(getFileName(filePath)));
    const createdFiles = danger.git.created_files.filter(filePath => !ignoredFileTypeRegex.test(getFileName(filePath)));
    const changes = await Promise.all([...modifiedFiles, ...createdFiles].map(async filePath => {
        const diff = await danger.git.diffForFile(filePath);
        return diff.added;
    }));
    const totalChanges = (changes.reduce((a, b) => a + b, 0));
    return totalChanges.split("+").length - 1;
}