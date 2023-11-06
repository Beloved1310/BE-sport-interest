// twilioVerify.js
const twilio = require("twilio");
const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_VERIFY_SID } =
  process.env;

if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN) {
  throw new Error(
    "Twilio credentials are missing. Make sure to set TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN environment variables."
  );
}

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_VERIFY_SID);

async function initiateVerification( to, channel ) {
 
  try {
    const verification = await client.verify.v2
      .services(TWILIO_VERIFY_SID)
      .verifications.create({ to, channel });
    return verification.status;
  } catch (error) {
    console.error(`Error initiating verification: ${error.message}`);
    throw error;
  }
}

async function checkVerification(to, code ) {
  try {
    const verificationCheck = await client.verify.v2
      .services(TWILIO_VERIFY_SID)
      .verificationChecks.create({ to, code });

    return verificationCheck.status;
  } catch (error) {
    console.error(`Error checking verification: ${error.message}`);
    throw error;
  }
}

module.exports = { initiateVerification, checkVerification };
