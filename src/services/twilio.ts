import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceSid: string = process.env.TWILIO_SERVICE_SID!;

const fromNumber = process.env.FROM_NUMBER;

const client = twilio(accountSid, authToken, { lazyLoading: true });

export function sendVerificationToken(mobile: string) {
  return client.verify.services(serviceSid).verifications.create({ to: `+1${mobile}`, channel: 'sms' });
}

export function retrieveVerificationStatus(code: string, mobile: string) {
  return client.verify.services(serviceSid).verificationChecks.create({ to: `+1${mobile}`, code });
}

export function sendMessage(mobile: string, message: string) {
  return client.messages.create({ body: message, from: fromNumber, to: `+1${mobile}` });
}
