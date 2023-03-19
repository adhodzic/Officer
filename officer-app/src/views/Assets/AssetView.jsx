import AssetTable from './components/AssetTable'
import AssetGroupTable from './components/AssetGroupTable'
import './AssetView.scss'
import { useEffect } from 'react'

function AssetView() {
    return(
        <div className='AssetView'>
            <div className='asset-table'>
                {/* <AssetGroupTable></AssetGroupTable> */}
            </div>
            <div className='asset-table'>
                <AssetTable></AssetTable>
            </div>
        </div>
        
    )
}

export default AssetView