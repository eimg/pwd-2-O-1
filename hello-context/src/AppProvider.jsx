import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export default function AppProvider({ children }) {
    const [count, setCount] = useState(1);

    return <AppContext.Provider value={{ count, setCount }}>
        {children}
    </AppContext.Provider>
}

export function useApp() {
    return useContext(AppContext);
}
