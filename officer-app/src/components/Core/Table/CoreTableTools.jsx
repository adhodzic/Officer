import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons'


import './CoreTable.scss'

function CoreTableTools({create, remove}) {

    return (
        <div className='ToolBar'>
            <FontAwesomeIcon onClick={create} icon={faPlusCircle} />
            <FontAwesomeIcon onClick={remove}icon={faMinusCircle} />
        </div>
    )
}

export default CoreTableTools