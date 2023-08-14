import { authorize } from 'react-native-app-auth';
// eslint-disable-next-line import/no-extraneous-dependencies
import { GOOGLE_OAUTH_CLIENT_ID, GOOGLE_OAUTH_REDIRECT } from 'react-native-dotenv';

const config = {
  issuer: 'https://accounts.google.com',
  clientId: GOOGLE_OAUTH_CLIENT_ID,
  redirectUrl: GOOGLE_OAUTH_REDIRECT,
  scopes: [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email',
  ],
};

async function googleAuthorize() {
  // Log in to get an authentication token
  const authState = await authorize(config);

  return authState;
}

export default googleAuthorize;
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
