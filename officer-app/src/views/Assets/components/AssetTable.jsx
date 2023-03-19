import React, { useEffect, useState } from "react";
import CoreTable from "../../../components/Core/Table/CoreTable";
import "./AssetTable.scss";

import assetApi from '../../../services/assetApi'

function AssetTable() {
  const [assets, setAssets] = useState([])
  const [loading, setLoading] = useState(true)
  const loadData = async function () {
    setLoading(true)
    const apiData = await assetApi.get();
    setAssets(apiData);
    setLoading(false)
}
  useEffect(()=>{
    if(assets?.length == 0) loadData()
  },[assets])
  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "Name",
      },
      {
        Header: "Description",
        accessor: "Description",
      },
    ],
    []
  );
  const assetConf = {
    Name: {
        ControlType: "Text"
    },
    Label: {
        ControlType: "Text"
    },
    PurchaseDate: {
        ControlType: "Text"
    },
    Description: {
        ControlType: "Text"
    }
}
  return (
    <>
      {!loading && assets?.data && 
      (
      <>
      <CoreTable createFormConf={assetConf} apiService={assetApi} setData={setAssets} data={assets.data} columns={columns} title={'Assets'}></CoreTable>
      </>
      )
    }
    </>
  );
}

export default AssetTable;
