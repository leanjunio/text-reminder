import twilio from 'twilio';

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN, { lazyLoading: true });
const TWILIO_SERVICE_SID: string = process.env.TWILIO_SERVICE_SID!;

export function sendVerificationToken(mobile: string) {
  return client.verify
    .services(TWILIO_SERVICE_SID)
    .verifications.create({ to: `+1${mobile}`, channel: 'sms' });
}

export function retrieveVerificationStatus(code: string, mobile: string) {
  return client.verify.services(TWILIO_SERVICE_SID).verificationChecks.create({ to: `+1${mobile}`, code });
}
