import { defineAuth, secret } from '@aws-amplify/backend';

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
      fromEmail: "deepak@raftinnovations.com",
            
      fromName: "Chalrahi Support",
      replyTo: "deepak@raftinnovations.com"
    },
  },
});
