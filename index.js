const {Storage} = require('@google-cloud/storage');

const storage = new Storage();

// Define bucket names
const benignBucketName = 'sp24-41200-rglopez-malpdf-benign';
const maliciousBucketName = 'sp24-41200-rglopez-malpdf-malicious';

// Function to get the total number of files in a bucket
async function getTotalFilesInBucket(bucketName) {
    const [files] = await storage.bucket(bucketName).getFiles();
    return files.length;
}

// HTTP function entry point
exports.countPDFs = async (req, res) => {
    try {
        const benignFiles = await getTotalFilesInBucket(benignBucketName);
        const maliciousFiles = await getTotalFilesInBucket(maliciousBucketName);

        const response = {
            benignFiles,
            maliciousFiles
        };

        res.status(200).json(response);
    } catch (error) {
        console.error('Error fetching total files:', error);
        res.status(500).send('Internal Server Error');
    }
};
