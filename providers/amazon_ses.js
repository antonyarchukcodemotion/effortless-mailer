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

      // Split recipients to chunks. It is a limitation of the Amazon SES
      const recipientsChunks = spliceToChunks(recipients, MAX_EMAILS_PER_REQUEST);

      const sendEmail = data => ses.sendEmail(data).promise();
      const mailData = recipients => ({
        Source: options.from,
        Destination: {
          //ToAddresses: recipients,
          BccAddresses: recipients,
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

      return Promise.all(
        recipientsChunks.map(recipientsChunk =>
          sendEmail(mailData(recipientsChunk)),
        ),
      );
    },
  };
}

module.exports = {
  initProvider,
};
