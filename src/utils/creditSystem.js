const USER_ID_KEY = "roastmycv_user_id";
const CREDITS_KEY = "roastmycv_credits";
const INITIAL_CREDITS = 2;

function generateUserId() {
  return "user_" + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
}

export function initUser() {
  let userId = localStorage.getItem(USER_ID_KEY);
  if (!userId) {
    userId = generateUserId();
    localStorage.setItem(USER_ID_KEY, userId);
    localStorage.setItem(CREDITS_KEY, String(INITIAL_CREDITS));
  }
  return userId;
}

export function getCredits() {
  const credits = localStorage.getItem(CREDITS_KEY);
  if (credits === null) {
    localStorage.setItem(CREDITS_KEY, String(INITIAL_CREDITS));
    return INITIAL_CREDITS;
  }
  return parseInt(credits, 10);
}

export function useCredit() {
  const current = getCredits();
  if (current <= 0) return false;
  localStorage.setItem(CREDITS_KEY, String(current - 1));
  return true;
}

export function addCredit(amount = 1) {
  const current = getCredits();
  localStorage.setItem(CREDITS_KEY, String(current + amount));
}

export function hasCredits() {
  return getCredits() > 0;
}
