import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'chalrahiStorage',
  access: (allow) => ({
    'profilePictures/{entity_id}/*': [
      allow.entity('identity').to(['read', 'write', 'delete']),
      allow.authenticated.to(['read'])
    ],
    'clubCoverPhotos/{entity_id}/*': [
        allow.entity('identity').to(['read', 'write', 'delete']),
        allow.authenticated.to(['read'])
    ],
    'clubProfilePhotos/{entity_id}/*': [
        allow.entity('identity').to(['read', 'write', 'delete']),
        allow.authenticated.to(['read'])
    ],
    'eventCoverPhotos/{entity_id}/*': [
        allow.entity('identity').to(['read', 'write', 'delete']),
        allow.authenticated.to(['read'])
    ],
    'placeMapSnaps/{entity_id}/*': [
      allow.entity('identity').to(['read', 'write', 'delete']),
      allow.authenticated.to(['read'])
    ],
    'placeCoverPhotos/{entity_id}/*': [
      allow.entity('identity').to(['read', 'write', 'delete']),
      allow.authenticated.to(['read'])
    ],
    'gpxFiles/{entity_id}/*': [
      allow.entity('identity').to(['read', 'write', 'delete']),
      allow.authenticated.to(['read'])
    ],
    'media/{entity_id}/*': [
      allow.entity('identity').to(['read', 'write', 'delete']),
      allow.authenticated.to(['read'])
    ]
  }),
});
