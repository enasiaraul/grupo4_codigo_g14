import { createContext, useState } from "react";

export const UserContext = createContext()

export const UserProvider = ({children}) => {
    const [totalValor,setTotalValor] = useState(0)
    
    return(
        <UserContext.Provider value={{totalValor,setTotalValor}}>
            {children}
        </UserContext.Provider>
    )
}