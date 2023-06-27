import create from "zustand";
import { persist } from "zustand/middleware";

// export const UserContext = createContext({ user: null, username: null })

const backend_url = process.env.BACKEND_URL
const user_info_url = backend_url + "user-info/"
const tokenurl = process.env.BACKEND_ROOT + "api/token/"

export const useAuthorStore = create(
  persist((set, get) => ({
    user: null,
    username: null,
    logged: false,
    accessToken: null,
    refreshToken: null,
    setUser: (accessToken) => {
      fetch(backend_url, {
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
      const response = await fetch(tokenurl, {
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
          fetch(user_info_url, {
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


