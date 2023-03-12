import { createContext, useState } from "react"

const UserContext = createContext()

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(localStorage.getItem('user'));

    function login(data){
        localStorage.setItem('user',data)
        setUser(data)
    }
  
    function logout(){
        localStorage.removeItem('user')
        setUser(null)
    }
    return (
      <UserContext.Provider value={{ user, login, logout }}>
        {children}
      </UserContext.Provider>
    );
  }

export { UserContext, UserProvider }