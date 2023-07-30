import { authorize } from 'react-native-app-auth';

  const config = {
    clientId: process.env.REACT_APP_GITHUB_OAUTH_CLIENT_ID,
    redirectUrl: process.env.REACT_APP_GITHUB_OAUTH_REDIRECT,
    clientSecret: process.env.REACT_APP_GITHUB_OAUTH_CLIENT_SECRET,
    scopes: ['user:email'],
    additionalHeaders: { 'Accept': 'application/json' },
    serviceConfiguration: {
      authorizationEndpoint: 'https://github.com/login/oauth/authorize',
      tokenEndpoint: 'https://github.com/login/oauth/access_token',
      revocationEndpoint:
        'https://github.com/settings/connections/applications/' + process.env.REACT_APP_GITHUB_OAUTH_CLIENT_ID
    }
  };

  export default  githubAuthorize = async () => {
    // Log in to get an authentication token
    const authState = await authorize(config);

    return authState;
  };

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