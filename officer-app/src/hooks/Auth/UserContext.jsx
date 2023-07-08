import { createContext, useEffect, useState } from "react"
import { json, useNavigate } from "react-router-dom";

const UserContext = createContext()

function isValidJSON(str) {
  try {
    JSON.parse(str);
    return true
  } catch (err) {
    console.log(err.message);
    return false
  }
}

const UserProvider = ({ children }) => {
  var navigate = useNavigate();
  const [user, setUser] = useState(-1);
  const [token, setToken] = useState(null);
  const rawUser = localStorage.getItem('user');
  const rawToken = localStorage.getItem('token');
  useEffect(() => {
    if (!isValidJSON(rawUser) || !isValidJSON(rawToken)){
      clearUserAndToken();
      navigate('/login');
    }
    const jsonUser = JSON.parse(rawUser);
    const jsonToken = JSON.parse(rawToken);
    setUser(jsonUser);
    setToken(jsonToken);
  }, [])

  function login(data) {
    localStorage.setItem('token', JSON.stringify(data.Token))
    localStorage.setItem('user', JSON.stringify(data.User))
    setUser(data.User)
  }

  function logout() {
    clearUserAndToken()
  }

  function validatePrivilages(privilages){
    if(user != -1){
      console.log(user)
      return privilages.some((p)=>p.toLowerCase() == user.RoleName.toLowerCase())
    }
    return false
  }

  function clearUserAndToken() {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    setUser(null)
    setToken(null)
  }
  return (
    <UserContext.Provider value={{ user, login, logout, validatePrivilages }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider }