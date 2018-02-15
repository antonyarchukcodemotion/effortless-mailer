# effortless-mailer
Please note, that current default email provider is Amazon SES.

### Installation

```console
$ npm i effortless-mailer
```

### Features
- Email field could contain a string with a single email address or an array of addresses.
- An individual email will be sent as usual, with a recipient in "To:" field. If there are more then one recipient if will use "Bcc:" field instead.
- Amazon SES has limitation of 50 recipients per API request. If you will try to send an email to a higher amount of users, this module will split it into multiple bunches of up to a 50 users and will wrap it in a single Promise.
### Usage

```javascript 1.6
// Config for Amazon SES:
const options = {
  from: 'Company <info@company.com>',
  accessKeyId: "ABC123",
  secretAccessKey: "XYZ789",
  region: "us-east-1",
};
 
const mailer = require('effortless-mailer')(options);
 
mailer.sendEmail(email, subject, htmlBody)
```
