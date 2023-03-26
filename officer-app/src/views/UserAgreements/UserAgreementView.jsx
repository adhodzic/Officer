import UserAgreementTable from './components/UserAgreementTable'
import './UserAgreementView.scss'
import { useEffect, useState } from 'react'

function UserAgreementView() {
    return (
        <div className='UserAgreementView'>
            <div className='user=agreement-table'>
                <UserAgreementTable></UserAgreementTable>
            </div>
        </div>
    )
}

export default UserAgreementView