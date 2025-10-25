import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';

const backend = defineBackend({
  auth,
  data,
});

const { cfnResources } = backend.auth.resources;
const { cfnUserPool, cfnUserPoolClient } = cfnResources;

// Specify which authentication factors you want to allow with USER_AUTH
cfnUserPool.addPropertyOverride(
	'Policies.SignInPolicy.AllowedFirstAuthFactors',
	['PASSWORD', 'WEB_AUTHN', 'EMAIL_OTP']
);

// The USER_AUTH flow is used for passwordless sign in
cfnUserPoolClient.explicitAuthFlows = [
	'ALLOW_REFRESH_TOKEN_AUTH',
	'ALLOW_USER_AUTH'
];

/* Needed for WebAuthn */
// The WebAuthnRelyingPartyID is the domain of your relying party, e.g. "example.domain.com"
cfnUserPool.addPropertyOverride('WebAuthnRelyingPartyID', 'af8c280ca74684c30889.auth.ap-south-1.amazoncognito.com');
cfnUserPool.addPropertyOverride('WebAuthnUserVerification', 'preferred');