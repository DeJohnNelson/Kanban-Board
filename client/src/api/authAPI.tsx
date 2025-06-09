import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {

  // TODO: make a POST request to the login route
  const response = await fetch('/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': '',
    },
    body: JSON.stringify(userInfo),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  const data = await response.json();
  return data;
};




export { login };
