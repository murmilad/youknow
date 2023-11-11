import { authorize } from 'react-native-app-auth';
// eslint-disable-next-line import/no-extraneous-dependencies
import { GOOGLE_OAUTH_CLIENT_ID, GOOGLE_OAUTH_REDIRECT } from 'react-native-dotenv';

const config = {
  issuer: 'https://accounts.google.com',
  clientId: GOOGLE_OAUTH_CLIENT_ID,
  redirectUrl: GOOGLE_OAUTH_REDIRECT,
  scopes: ['profile', 'email'],
};

function googleAuthorize() {
  // Log in to get an authentication token
  console.log(`GOOGLE_OAUTH_CLIENT_ID = ${GOOGLE_OAUTH_CLIENT_ID}`);
  console.log(`GOOGLE_OAUTH_REDIRECT = ${GOOGLE_OAUTH_REDIRECT}`);
  return authorize(config);
}

export default googleAuthorize;
/*
https://youknow.app/api/sessions/oauth/google?state=Du_jNBL-saIRK6dJx6c2ww&code=4%2F0AfJohXlnwYpIfImqAopMQtohgwPJ5970vRlFUTOyiyq72Usq9rk0Hu7j_NTRz8owqXtatg&scope=email+profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+openid&authuser=0&prompt=none
*missing code verifier
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
