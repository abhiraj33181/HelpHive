import { createContext } from "react"

export const ProviderContext = createContext();

const ProviderContextProvider = (props) => {
    
    
    const value = {
        
    }


    return (
        <ProviderContext.Provider value={value}>
            {props.children}
        </ProviderContext.Provider>
    )
}

export default ProviderContextProvider