const LocalHostRefreshTokenOption = {
    httpOnly: true,
    secure: false, 
    sameSite: 'Lax',
    expires: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000)
};

const DeploymentRefreshTokenOption = {
    httpOnly: true,
    secure: true,
    sameSite: 'Strict',
    domain: ".vaanitube.com",
    expires: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000)
};

const LocalHostAccessTokenOption = {
    httpOnly: true,
    secure: false, 
    sameSite: 'Lax', 
    expires: new Date(Date.now() + 5 * 60 * 60 * 1000) 
};

const DeploymentAccessTokenOption = {
    httpOnly: true,
    secure: true,
    sameSite: 'Strict',
    domain: ".vaanitube.com",
    expires: new Date(Date.now() + 6 * 60 * 60 * 1000) 
};

const RefreshtokenOption = process.env.NODE_ENV === 'production'
    ? DeploymentRefreshTokenOption
    : LocalHostRefreshTokenOption;

const AccesstokenOption = process.env.NODE_ENV === 'production'
    ? DeploymentAccessTokenOption
    : LocalHostAccessTokenOption;

export { RefreshtokenOption, AccesstokenOption };
