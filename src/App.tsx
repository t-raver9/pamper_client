import React, { useEffect, useState } from "react";

import axios from "axios";
import { log } from "console";

function App() {
  const baseUrl = "http://localhost:3001";

  const getUserByIdApi = async (id: string) => {
    try {
      const response = await axios.get(`${baseUrl}/api/users/${id}`);
      console.log("RAW RESPONSE: ", response);
      return response.data;
    } catch (error) {
      console.error("Error getting user: ", error);
    }
  };

  const signUpUserApi = async (email: string, password: string) => {
    console.log(email, password);
    try {
      const response = await axios.post(
        `${baseUrl}/signup`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      console.log("RAW RESPONSE: ", response);
      // don't think this is very safe
      localStorage.setItem("accessToken", response.data.accessToken);
      return response.data;
    } catch (error) {
      console.error("Error signing up user: ", error);
    }
  };

  const loginUserApi = async (email: string, password: string) => {
    try {
      const response = await axios.post(
        `${baseUrl}/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      console.log("RAW RESPONSE: ", response);
      // don't think this is very safe
      localStorage.setItem("accessToken", response.data.accessToken);
      return response.data;
    } catch (error) {
      console.error("Error loging in user: ", error);
    }
  };

  // For get user UI
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // For signUp UI
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signUpLoading, setSignupLoading] = useState(false);
  const [signUpError, setSignupError] = useState<string | null>(null);
  const [signUpUser, setSignupUser] = useState(null);

  // For login UI
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginUser, setLoginUser] = useState(null);

  // For auth test
  const [users, setUsers] = useState<any>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const user = await getUserByIdApi(userId);
      setUser(user);
      console.log("USER: ", user);
    } catch (_error) {
      setError("Error fetching user");
    }

    setLoading(false);
  };

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSignupLoading(true);
    setSignupError(null);

    try {
      const user = await signUpUserApi(email, password);
      setSignupUser(user);
      console.log("USER: ", user);
    } catch (_error) {
      setSignupError("Error loging up user");
    }

    setSignupLoading(false);
  };

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoginLoading(true);
    setLoginError(null);

    try {
      const user = await loginUserApi(loginEmail, loginPassword);
      setLoginUser(user);
      console.log("USER: ", user);
    } catch (_error) {
      setLoginError("Error loging in user");
    }

    setLoginLoading(false);
  };

  const handleAuthTest = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.get(`${baseUrl}/users/current`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error getting auth test: ", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Enter user ID"
        />
        <button type="submit">Fetch User</button>
      </form>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : user ? (
        <div>
          <h2>User Data:</h2>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
      ) : null}
      <form onSubmit={handleSignUp}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />
        <button type="submit">Sign Up</button>
      </form>
      {signUpLoading ? (
        <p>Loging up...</p>
      ) : signUpError ? (
        <p>{signUpError}</p>
      ) : signUpUser ? (
        <div>
          <h2>Sign up user data:</h2>
          <pre>{JSON.stringify(signUpUser, null, 2)}</pre>
        </div>
      ) : null}
      <form onSubmit={handleSignIn}>
        <input
          type="email"
          value={loginEmail}
          onChange={(e) => setLoginEmail(e.target.value)}
          placeholder="Enter email"
        />
        <input
          type="password"
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
          placeholder="Enter password"
        />
        <button type="submit">Sign In</button>
      </form>
      {loginLoading ? (
        <p>Loging in...</p>
      ) : loginError ? (
        <p>{loginError}</p>
      ) : loginUser ? (
        <div>
          <h2>Sign in user data:</h2>
          <pre>{JSON.stringify(loginUser, null, 2)}</pre>
        </div>
      ) : null}
      <div>
        <h2>Authentication Test:</h2>
        <form onSubmit={handleAuthTest}>
          <button type="submit">Test Authentication</button>
        </form>
        {users ? (
          <div>
            <h2>Authenticated Users Data:</h2>
            <pre>{JSON.stringify(users, null, 2)}</pre>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default App;
