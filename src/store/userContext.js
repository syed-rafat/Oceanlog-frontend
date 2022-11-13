import create from "zustand";
import { persist } from "zustand/middleware";

// export const UserContext = createContext({ user: null, username: null })

export const useAuthorStore = create(
  persist((set, get) => ({
    user: null,
    username: null,
    logged: false,
    accessToken: null,
    refreshToken: null,
    setUser: (accessToken) => {fetch("http://127.0.0.1:8000/content/user-info/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.warn(res)
        set({ user: res.id, username: res.username, logged: true })});
    },
    setToken: (acesstoken, refreshtoken) =>
      set({ acessToken: acesstoken, refreshToken: refreshtoken }),
    login: async (info) => {
      const response = await fetch("http://127.0.0.1:8000/api/token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(info), //need to use JSON.stringify() before sending data
      });
      const res = await response.json();
      function authorizer(data) {
        if (typeof window !== "undefined") {
          console.log("data got from authorizer function", data)
          localStorage.setItem("accessToken", data.access);
          localStorage.setItem("refreshToken", data.refresh);
          console.warn("authorizer is executed, data here");
          console.log(data);
          fetch("http://127.0.0.1:8000/content/user-info/", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${data.access}`,
            },
          })
            .then((res) => res.json())
            .then((res) => set({ user: res.user, username: res.username }));
          set({ acessToken: data.access, refreshToken: data.refresh });
        }
      }
      authorizer(res);
    },
  })),
  {
    name: 'user-storage'
  }
);


