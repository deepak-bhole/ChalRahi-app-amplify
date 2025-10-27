import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'chalrahiStorage',
  access: (allow) => ({
    'profilePictures/{entity_id}/*': [
      allow.entity('identity').to(['read', 'write', 'delete']),
      allow.authenticated.to(['read'])
    ],
    'clubCoverPhotos/{cognitoIdentityId}/{clubId}/*': [
        allow.authenticated.to(['read', 'write', 'delete']),
    ],
    'clubProfilePhotos/{cognitoIdentityId}/{clubId}/*': [
        allow.authenticated.to(['read', 'write', 'delete']),
    ],
    'eventCoverPhotos/{cognitoIdentityId}/{eventId}/*': [
        allow.authenticated.to(['read', 'write', 'delete']),
    ],
    'placeMapSnaps/{cognitoIdentityId}/{placeId}/*': [
      allow.authenticated.to(['read', 'write', 'delete']),
    ],
    'placeCoverPhotos/{cognitoIdentityId}/{placeId}/*': [
      allow.authenticated.to(['read', 'write', 'delete']),
    ]
  }),
});