import { createContext } from "react";

export const AppContext = createContext()

const AppContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const currency = '$'
    const calculateAge = (dob) => {
        const today = new Date()
        const birtday = new Date(dob)
        let age = today.getFullYear() - birtday.getFullYear()

        return age
    }

    const months = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const slotDataFormat = (slotDate) => {
        const dateArray = slotDate.split('-')
        return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    }

    const value = {
        calculateAge,slotDataFormat,currency,backendUrl
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;