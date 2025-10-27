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
    'clubProfilePhotos/{cognitoIdentityId}/{clubId}/*': [
        allow.entity('identity').to(['read', 'write', 'delete']),
        allow.authenticated.to(['read'])
    ],
    'eventCoverPhotos/{cognitoIdentityId}/{eventId}/*': [
        allow.entity('identity').to(['read', 'write', 'delete']),
        allow.authenticated.to(['read'])
    ],
    'placeMapSnaps/{cognitoIdentityId}/{placeId}/*': [
      allow.entity('identity').to(['read', 'write', 'delete']),
      allow.authenticated.to(['read'])
    ],
    'placeCoverPhotos/{cognitoIdentityId}/{placeId}/*': [
      allow.entity('identity').to(['read', 'write', 'delete']),
      allow.authenticated.to(['read'])
    ]
  }),
});