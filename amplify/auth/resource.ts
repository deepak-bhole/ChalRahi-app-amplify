import { defineAuth, secret } from '@aws-amplify/backend';

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
    externalProviders: {
      google: {
        clientId: secret('GOOGLE_CLIENT_ID'),
        clientSecret: secret('GOOGLE_CLIENT_SECRET'),
        scopes: ['email', 'profile']
      },
      callbackUrls: ['myapp://callback'],
      logoutUrls: ['myapp://logout'],
    }
  },  
  senders: {
    email: {
      // configure using the email registered and verified in Amazon SES
      fromEmail: "deepak@raftinnovations.com",
            
      fromName: "Chalrahi Support",
      replyTo: "deepak@raftinnovations.com"
    },
  },
});
