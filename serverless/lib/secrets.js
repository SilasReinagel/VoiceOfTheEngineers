// Load the AWS SDK
const aws = require('aws-sdk'),
const region = "us-west-2",
    

// Create a Secrets Manager client
var secretsManager = new AWS.SecretsManager({
    region: region
});

const getSecretAsync = async secretId => {
    try {
        console.log("trying to get secrets from secrets manager")
        const data = await secretsManager.getSecretValue({
            SecretId: secretId,
        }).promise();

        if (data) {
            if (data.SecretString) {
                const secret = data.SecretString;
                const parsedSecret = JSON.parse(secret);
                return parsedSecret.MongoDBConnectionString;
            }

            const binarySecretData = data.SecretBinary;
            return binarySecretData;
        }
    } catch (error) {
        console.log('Error retrieving secrets');
        console.log(error);
    }
};

const getMongoConfig = async () => {
    const secretId  = `mongodb/${process.env.stage}/mongodbconnectionstring`;

    await getSecretAsync(secretId)
        .catch(err => {
            console.log('Error retrieving mongo config');
        });
}

module.exports = { getMongoConfig  };