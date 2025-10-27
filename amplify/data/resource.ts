import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  User: a.model({

      id: a.id().required(), 
      
      firstName: a.string(),
      lastName: a.string(),
      birthday: a.date(),
      gender: a.enum(['MAN', 'WOMAN', 'NON_BINARY', 'PREFER_NOT_TO_SAY', 'OTHER']),
      preferredActivities: a.string().array(),

      username: a.string(), 
      bio: a.string(),
      profilePictureKey: a.string(),
      
      activities: a.hasMany('Activity', 'userId'),
      clubs: a.hasMany('ClubMember', 'userId'),
      rsvps: a.hasMany('EventRSVP', 'userId'),

    })
    .authorization((allow) => [
      allow.owner(),
      allow.authenticated().to(['read'])
    ]),



  Club: a.model({

    name: a.string().required(),
    description: a.string(),
    location: a.string(),
    coverImageKey: a.string(),

    isPrivate: a.boolean().default(false),
    
    members: a.hasMany('ClubMember', 'clubId'),
    events: a.hasMany('Event', 'clubId'),

  }).authorization(allow => [
    allow.owner(),
    allow.authenticated().to(['read']) 
  ]),

  ClubMember: a.model({
        
    clubId: a.id().required(),
    userId: a.id().required(),

    club: a.belongsTo('Club', 'clubId'),
    user: a.belongsTo('User', 'userId'),
    role: a.enum(['MEMBER', 'ADMIN']),

    status: a.enum(['PENDING', 'APPROVED']),
    
  }).authorization(allow => [
    allow.owner().to(['update', 'delete']), 
    allow.authenticated().to(['read', 'create'])
  ]),

  Event: a.model({

    title: a.string().required(),
    description: a.string(),
  
    startDateTime: a.datetime().required(),
    endDateTime: a.datetime(),

    meetingPoint: a.string(),
    
    clubId: a.id().required(),
    club: a.belongsTo('Club', 'clubId'),
    rsvps: a.hasMany('EventRSVP', 'eventId'),
    linkedExperiences: a.hasMany('Activity', 'eventId'),

  }).authorization(allow => [
    allow.owner(),
    allow.authenticated().to(['read'])
  ]),


  EventRSVP: a.model({

    eventId: a.id().required(),
    event: a.belongsTo('Event', 'eventId'),
    userId: a.id().required(),
    user: a.belongsTo('User', 'userId'),

  }).authorization(allow => [allow.owner()]),


  Activity: a.model({

    type: a.enum(['RUN', 'HIKE', 'CYCLE', 'WALK']),
    distance: a.float(),
    duration: a.integer(), 
    gpxFileKey: a.string(), 
    experienceTitle: a.string(),
    aiNarrative: a.string(), 
    media: a.hasMany('Media', 'activityId'),
    eventId: a.id(),
    event: a.belongsTo('Event', 'eventId'),
    userId: a.id().required(),
    user: a.belongsTo('User', 'userId'),    
    
  }).authorization(allow => [
    allow.owner(),
    allow.authenticated().to(['read']) 
  ]),

  Media: a.model({

    type: a.enum(['AUDIO', 'VIDEO', 'PHOTO']),
    s3Key: a.string().required(),
    timestamp: a.datetime(),
    transcription: a.string(), 
    detectedObjects: a.string().array(), 
    
    activityId: a.id().required(),
    activity: a.belongsTo('Activity', 'activityId')

  }).authorization(allow => [allow.owner()]),
});


export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool"
  },
});
