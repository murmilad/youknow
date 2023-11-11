import { authorize } from 'react-native-app-auth';

// eslint-disable-next-line import/no-extraneous-dependencies
import {
  GITHUB_OAUTH_APP_CLIENT_ID,
  GITHUB_APP_OAUTH_REDIRECT_URL,
  GITHUB_OAUTH_APP_CLIENT_SECRET,
} from 'react-native-dotenv';

const config = {
  clientId: GITHUB_OAUTH_APP_CLIENT_ID,
  redirectUrl: GITHUB_APP_OAUTH_REDIRECT_URL,
  clientSecret: GITHUB_OAUTH_APP_CLIENT_SECRET,
  scopes: ['user:email'],
  additionalHeaders: { Accept: 'application/json' },
  serviceConfiguration: {
    authorizationEndpoint: 'https://github.com/login/oauth/authorize',
    tokenEndpoint: 'https://github.com/login/oauth/access_token',
    revocationEndpoint: `https://github.com/settings/connections/applications/${GITHUB_OAUTH_APP_CLIENT_ID}`,
  },
};

function githubAuthorize() {
  // Log in to get an authentication token

  return authorize(config);
}

export default githubAuthorize;
/*


   // Log in to get an authentication token
  const authState = await authorize(config);
  
  // Refresh token
  const refreshedState = await refresh(config, {
    refreshToken: authState.refreshToken
  });
  
  // Revoke token
  await revoke(config, {
    tokenToRevoke: refreshedState.refreshToken
  }); 
  */
