const providers = require('./providers');
const {AMAZON_SES} = require('./providersList');

module.exports = (options, provider = AMAZON_SES) => {
  if (providers[provider] === undefined) {
    throw new Error(`Email provider ${provider} is not implemented.`);
  }
  return providers[provider].initProvider(options);
};
