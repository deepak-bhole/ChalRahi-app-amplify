import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'chalrahiStorage',
  access: (allow) => ({
    'profilePictures/{cognitoSub}/*': [
      allow.entity('identity').to(['read', 'write', 'delete']),
      allow.authenticated.to(['read'])
    ],
  }),
});