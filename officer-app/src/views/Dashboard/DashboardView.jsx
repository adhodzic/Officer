import './DashboardView.scss'
import { useContext,useEffect, useState } from 'react'
import AssetAgreementTable from '../AssetAgreements/components/AssetAgreementTable'
function DashboardView() {
    return (
        <>
        <h1>Dashboard</h1>
        <div className='DashboardView'>
            <div className='aggrement-in-progress'>
                <AssetAgreementTable actionBar={false} title='Completed Agreements'></AssetAgreementTable>
            </div>
            <div className='aggrement-done'>
                <AssetAgreementTable actionBar={false} title='In-progress Agreements'></AssetAgreementTable>
            </div>
        </div>
        </>
    )
}

export default DashboardView