import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'chalrahiStorage',
  access: (allow) => ({
    'profilePictures/{entity_id}/*': [
      allow.entity('identity').to(['read', 'write', 'delete']),
      allow.authenticated.to(['read'])
    ],
    'clubCoverPhotos/{cognitoIdentityId}/{clubId}/*': [
        allow.entity('identity').to(['read', 'write', 'delete'])
    ],
  }),
});