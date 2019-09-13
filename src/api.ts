const SERVER_URL = "https://chat-app-jov.herokuapp.com";

export const verifyToken = async () => {
  try {
    const res = await fetch(`${SERVER_URL}/verifyToken`, {
      headers: { Accept: "application/json" },
      credentials: "include"
    });
    if (res.ok) {
      const user = await res.json();
      return { user };
    } else {
      return {
        error: true,
        reason: "server"
      };
    }
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.error(err);
    }
    return {
      error: true,
      reason: "server"
    };
  }
};

export const login = async (email: string, password: string) => {
  try {
    const res = await fetch(`${SERVER_URL}/login`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      credentials: "include"
    });
    if (res.ok) {
      const user = await res.json();
      return { user };
    } else {
      if (res.status >= 400 && res.status < 500) {
        return {
          error: true,
          reason: "client"
        };
      }
    }
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.error(err);
    }
    return {
      error: true,
      reason: "server"
    };
  }
};

export const logout = async () => {
  try {
    await fetch(`${SERVER_URL}/logout`, {
      credentials: "include"
    });
    return {};
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.error(err);
    }
    return {
      error: true,
      reason: "server"
    };
  }
};
