import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'

import './UserCard.scss'
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../hooks/Auth/UserContext';
function UserCard({ collapseState }) {
    const { user, logout } = useContext(UserContext);
    const [userObj, setUserObj] = useState()
    useEffect(() => {
        setUserObj(JSON.parse(user).User);
    }, [user])
    return (
        <>
            {userObj && (
                <div className={`UserCard ${collapseState ? 'collapsed' : ''}`}>
                    <div className="user-icon">
                        <img src="https://source.unsplash.com/featured/50x50?profile" alt="" />
                    </div>
                    <div className="user-info">
                        <p className='name'>{userObj.FullName}</p>
                        <p className='role'>{userObj.Role}</p>
                    </div>
                    <div className='user-logout'>
                        <FontAwesomeIcon onClick={()=>{logout()}} icon={faRightFromBracket} />
                    </div>
                </div>
            )}
        </>
    )
}

export default UserCard