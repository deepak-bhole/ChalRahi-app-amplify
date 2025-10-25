import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  User: a
    .model({
      // We will set this ID to match the Cognito User's ID (sub)
      id: a.id().required(), 
      
      // Fields from "What's your name?" screen
      firstName: a.string(),
      lastName: a.string(),

      // Field from "When's your birthday?" screen
      birthday: a.date(),

      // Field from "What's your gender?" screen
      gender: a.enum(['MAN', 'WOMAN', 'NON_BINARY', 'PREFER_NOT_TO_SAY', 'OTHER']),

      // You can add more fields here, like from "activity types"
      preferredActivities: a.string().array(),

      // The 'owner' field links this data to the authenticated user
      // This rule states that only the owner can create, read, update, or delete their own User entry.
      owner: a.string()
        .required()
        .authorization(allow => [allow.owner()]),
    })
    // We set the auth rule on the model itself
    .authorization((allow) => [allow.owner()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool"
  },
});
