# effortless-mailer
Currently, default mail provider is Amazon SES.

## Installation

```console
$ npm i effortless-mailer
```

### Using

```javascript 1.6
// Config for Amazon SES:
const options = {
  from: 'Company <info@company.com>',
  accessKeyId: "ABC123",
  secretAccessKey: "XYZ789",
  region: "us-east-1",
};
 
const mailer = require('effortless-mailer')(options);
 
// 'email' could be a string with email address or an array of addresses
mailer.sendEmail(email, subject, htmlBody)
```
