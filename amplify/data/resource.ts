import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const PlaceDifficulty = a.enum(["EASY", "MODERATE", "HARD"]);
const PlaceRouteType = a.enum(["OUT_AND_BACK", "CIRCULAR", "POINT_TO_POINT"]);

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
      following: a.hasMany("Follow", "followerId"),
      followers: a.hasMany("Follow", "followedId"),
      reviews: a.hasMany("Review", "userId"),

    })
    .authorization((allow) => [
      allow.owner(),
      allow.authenticated().to(['read'])
    ]),

  Follow: a
    .model({

      id: a.id().required(),
      followerId: a.id().required(),
      follower: a.belongsTo("User", "followerId"),
      followedId: a.id().required(),
      followed: a.belongsTo("User", "followedId"),

    })
    .authorization((allow) => [allow.owner()]),


  Club: a.model({

    name: a.string().required(),
    description: a.string(),
    location: a.string(),
    coverImageKey: a.string(),
    isPrivate: a.boolean().default(false),
    profilePhotoKey: a.string(),
    category: a
      .enum([
        "RUNNING",
        "CYCLING",
        "HIKING",
        "TRIATHLON",
        "SWIMMING",
        "WALKING",
        "OTHER",
      ]),
    tags: a.string().array(),
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
    allow.authenticated().to(['read', 'create', 'update'])
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
    location: a.string(),
    tags: a.string().array(),
    coverImages: a.string().array(), 
    announcements: a.string().array(),
    thingsToKnow: a.string().array(),
    termsAndConditions: a.string(),
    organizerContact: a.string(),
    cost: a.float().default(0),
    itinerary: a.string(),
    inclusions: a.string().array(),
    relatedPlaces: a.hasMany("EventPlace", "eventId"),

  }).authorization(allow => [
    allow.owner(),
    allow.authenticated().to(['read'])
  ]),


  EventRSVP: a.model({

    eventId: a.id().required(),
    event: a.belongsTo('Event', 'eventId'),
    userId: a.id().required(),
    user: a.belongsTo('User', 'userId'),
    status: a
        .enum(["PENDING", "APPROVED", "DENIED"]),

  }).authorization(
    allow => [allow.owner(),
    allow.authenticated().to(['read','create']),

  ]),

  Place: a
    .model({
      id: a.id().required(),
      name: a.string().required(),
      description: a.string(),
      type: a.enum(["RUNNING", "HIKING", "CYCLING", "WALKING", "OTHER"]),
      location: a.string(), // e.g., "Velhe, Maharashtra, India"
      mapSnapshotKey: a.string(),
      coverImages: a.string().array(),
      details: a.string(), // Long-form details
      relatedEvents: a.hasMany("EventPlace", "placeId"),

      // --- NEW FIELDS ---
      rating: a.float().default(0),
      reviewCount: a.integer().default(0),
      activityCount: a.integer().default(0),
      length: a.float(), // in km
      elevationGain: a.float(), // in meters
      estimatedTime: a.string(), // e.g., "2h 30m"
      difficulty: PlaceDifficulty,
      routeType: PlaceRouteType,
      attractions: a.string().array(), // e.g., ["Epic views", "Wildflowers"]
      suitability: a.string().array(), // e.g., ["Dog-friendly"]
      contactName: a.string(),
      contactPhone: a.string(),
      contactEmail: a.string(),
      aiReviewSummary: a.string(), // For "Trailgoers are saying..."
      reviews: a.hasMany("Review", "placeId"), // Link to reviews
      activities: a.hasMany("Activity", "placeId"), // Link to activities
    })
    .authorization((allow) => [
      allow.owner().to(['update', 'delete']), 
    allow.authenticated().to(['read', 'create', 'update'])
    ]),

  EventPlace: a
    .model({
      id: a.id().required(),
      placeId: a.id().required(),
      place: a.belongsTo("Place", "placeId"),
      eventId: a.id().required(),
      event: a.belongsTo("Event", "eventId"),
    })
    .authorization((allow) => [
      allow.owner().to(['update', 'delete']), 
      allow.authenticated().to(['read', 'create', 'update'])
    ]),

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
    placeId: a.id(),
    place: a.belongsTo("Place", "placeId"),
    
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

  Review: a
    .model({
      id: a.id().required(),
      placeId: a.id().required(),
      place: a.belongsTo("Place", "placeId"),
      userId: a.id().required(),
      user: a.belongsTo("User", "userId"),
      rating: a.integer().required(), // 1-5
      comment: a.string(),
    })
    .authorization((allow) => [
      allow.owner(),
      allow.authenticated().to(["read"]),
    ]),
    
});


export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool"
  },
});
