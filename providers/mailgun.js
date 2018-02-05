const mailgunJS = require('mailgun-js');

function initProvider(options) {
  const mailgun = mailgunJS(options);

  return {
    sendEmail: (destination, subject, body) => {
      const mailTo = Array.isArray(destination)
          ? destination.join(',')
          : destination;

      const mailData = Object.assign({}, {
        from: options.from,
        to: mailTo,
        subject,
        html: body,
      });

      return mailgun.messages().send(mailData);
    },
  };
}

module.exports = {
  initProvider,
};
