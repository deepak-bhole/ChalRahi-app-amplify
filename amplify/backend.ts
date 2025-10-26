import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { storage } from './storage/resource';

const backend = defineBackend({
  auth,
  data,
  storage,
});

const { cfnResources } = backend.auth.resources;
const { cfnUserPool, cfnUserPoolClient } = cfnResources;

cfnUserPool.addPropertyOverride(
	'Policies.SignInPolicy.AllowedFirstAuthFactors',
	['PASSWORD', 'WEB_AUTHN', 'EMAIL_OTP']
);

cfnUserPoolClient.explicitAuthFlows = [
	'ALLOW_REFRESH_TOKEN_AUTH',
	'ALLOW_USER_AUTH'
];

cfnUserPool.addPropertyOverride('WebAuthnRelyingPartyID', 'af8c280ca74684c30889.auth.ap-south-1.amazoncognito.com');
cfnUserPool.addPropertyOverride('WebAuthnUserVerification', 'preferred');