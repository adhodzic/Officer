import "./Sidebar.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket, faBuilding, faBoxesStacked, faListCheck, faPeopleGroup, faChevronCircleLeft, faGear } from '@fortawesome/free-solid-svg-icons'
import UserCard from "./UserCard";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../../hooks/Auth/UserContext";
function Sidebar({collapseState, setCollapseState}) {
    const {logout} = useContext(UserContext)
    return (
        <div className={`Sidebar ${collapseState?'collapsed':''}`}>
            <div className="Sidebar-collapse-button" onClick={(e)=>{setCollapseState(!collapseState)}}>
                <FontAwesomeIcon className="collapse-icon" icon={collapseState?faBuilding:faChevronCircleLeft} />
            </div>
            <div className="Sidebar-header">
                <div className="Sidebar-title">
                    <h1>Officer</h1>
                    {/* <FontAwesomeIcon className="title-icon" icon={faBuilding} /> */}
                </div>
                <div className="Sidebar-body">
                <UserCard collapseState={collapseState}></UserCard>
                <div className="Sidebar-list">
                    <NavLink to={'/assets'} className="list-item">
                        <FontAwesomeIcon className="list-icon" icon={faBoxesStacked} />
                        <div className="list-name">Assets</div>
                    </NavLink>
                    <NavLink to={'/requests'} className="list-item">
                        <FontAwesomeIcon className="list-icon" icon={faListCheck} />
                        <div className="list-name">Requests</div>
                    </NavLink>
                    <NavLink to={'/employees'} className="list-item">
                        <FontAwesomeIcon className="list-icon" icon={faPeopleGroup} />
                        <div className="list-name">Employees</div>
                    </NavLink>
                </div>
            </div>
            </div>
            <div className="Sidebar-footer">
                <FontAwesomeIcon icon={faGear} />
            </div>
        </div>
    );
}

export default Sidebar;
