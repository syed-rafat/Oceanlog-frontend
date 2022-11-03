import { createContext } from "react"
import create from "zustand"


// export const UserContext = createContext({ user: null, username: null })

export const userStore = create((set) => ({ 
        user: null,
        username: null,
        accessToken: null,
        refreshToken: null,
        setToken: (acesstoken,refreshtoken) => set({acessToken: acesstoken,
        refreshToken: refreshtoken}),
        login: () => set((state) => ({ username: 'rafat'}))
}))
