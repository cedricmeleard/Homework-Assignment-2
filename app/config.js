/**
 * Create and configure variables
 */
const environments = {};

// staging (default) environment
environments.staging = {
  httpPort: 3000,
  httpsPort: 3001,
  envName: "staging",
  hashingSecret: "thisIsASecret"
};

// production environment
environments.production = {
  httpPort: 5000,
  httpsPort: 5001,
  envName: "production",
  hashingSecret: "thisIsAProductionSecret"
};

// Determine witch environment was passed on the command-line as argument
const currentEnvironment =
  typeof process.env.ENV_NODE === "string"
    ? process.env.ENV_NODE.toLocaleLowerCase()
    : "";

// Check current environment is defined, if not, default staging
const environment =
  typeof environments[currentEnvironment] === "object"
    ? environments[currentEnvironment]
    : environments.staging;

module.exports = environment;
