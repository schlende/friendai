export async function getUserFromSession(cookies: any) {

  const sessionData = {
    id: "0e6168df-8198-4ee3-8202-eef10eb84be9",
    username: "testuser",
    email: "test@example.com"
  };


  return sessionData;

  // const sessionCookie = cookies.get('session');
  // if (!sessionCookie) return null;
  // try {
  //   return JSON.parse(sessionCookie);
  // } catch {
  //   return null;
  // }
} 