let accessToken = null;
let userId = 0;

export function getAccessToken() {
  return accessToken;
}

export function setAccessToken(mAccessToken) {
  accessToken = mAccessToken;
}

export function getUserId() {
  return userId;
}

export function setUserId(mUserId) {
  userId = mUserId;
}