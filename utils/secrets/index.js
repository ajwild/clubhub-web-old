const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');

const secretCache = new Map();
const client = new SecretManagerServiceClient();

async function getSecretFromManager(secretName, version = 'latest') {
  if (secretCache.has(secretName)) {
    return secretCache.get(secretName);
  }

  const name = [
    'projects',
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    'secrets',
    secretName,
    'versions',
    version,
  ].join('/');
  const [secretVersion] = await client.accessSecretVersion({ name });
  const secret = secretVersion.payload.data.toString('utf8');

  secretCache.set(secretName, secret);

  return secret;
}

export async function getSecret(secretName) {
  if (process.env.NODE_ENV !== 'production') {
    return process.env[secretName];
  }

  return getSecretFromManager(secretName);
}

export async function getSecrets(secrets) {
  return Promise.all(secrets.map((secret) => getSecret(secret)));
}
