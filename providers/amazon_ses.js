const aws = require('aws-sdk');
const { spliceToChunks } = require('../utils');

const API_VERSION = '2010-12-01';
const MAX_EMAILS_PER_REQUEST = 50;

function initProvider(options) {
  aws.config.update(options);
  const ses = new aws.SES({ apiVersion: API_VERSION });

  return {
    sendEmail: (destination, subject, body) => {
      // Wrap destination in array if it is a string
      const recipients = Array.isArray(destination)
        ? destination
        : [destination];

      const sendEmail = data => ses.sendEmail(data).promise();
      const mailData = (recipients, useBlindCopies = false) => ({
        Source: options.from,
        Destination: {
          [useBlindCopies ? 'BccAddresses' : 'ToAddresses']: recipients,
        },
        Message: {
          Body: {
            Html: {
              Charset: 'UTF-8',
              Data: body,
            },
            // Text: {
            //   Charset: "UTF-8",
            //   Data: "TEXT_FORMAT_BODY"
            // }
          },
          Subject: {
            Charset: 'UTF-8',
            Data: subject,
          },
        },
      });

      if (recipients.length === 1) {
        // Send individual email
        return sendEmail(mailData(recipients));
      } else {
        // Split recipients to chunks. It is a limitation of the Amazon SES
        const recipientsChunks = spliceToChunks(recipients, MAX_EMAILS_PER_REQUEST);

        // Send all chunks as blind copies
        return Promise.all(
          recipientsChunks.map(recipientsChunk =>
            sendEmail(mailData(recipientsChunk, true)),
          ),
        );
      }
    },
    isVerifiedEmail: email => ses.listIdentities({ IdentityType: 'EmailAddress' }).promise()
      .then(data => data.Identities.includes(email)),
    verifyEmail: email => ses.verifyEmailIdentity({ EmailAddress: email }).promise(),
  };
}

module.exports = {
  initProvider,
};
