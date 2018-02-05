const aws = require('aws-sdk');

const API_VERSION = '2010-12-01';

function initProvider(options) {
  aws.config.update(options);
  const ses = new aws.SES({apiVersion: API_VERSION});

  return {
    sendEmail: (destination, subject, body) => {
      // TODO: Implement splitting to 50 emails
      const recipients = Array.isArray(destination)
          ? destination
          : [destination];

      const mailData = {
        Source: options.from,
        Destination: {ToAddresses: recipients},
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
      };

      return ses.sendEmail(mailData).promise();
    },
  };
}

module.exports = {
  initProvider,
};
