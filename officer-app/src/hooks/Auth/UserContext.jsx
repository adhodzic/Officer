import { createContext, useEffect, useState } from "react"

const UserContext = createContext()

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

    useEffect(()=>{
      setUser(JSON.parse(localStorage.getItem('user')))
    },[])

    function login(data){
        localStorage.setItem('token',JSON.stringify(data.Token))
        localStorage.setItem('user',JSON.stringify(data.User))
        setUser(data.User)
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