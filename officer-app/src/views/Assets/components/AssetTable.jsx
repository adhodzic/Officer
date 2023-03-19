import React, { useEffect, useState } from "react";
import CoreTable from "../../../components/Core/Table/CoreTable";
import "./AssetTable.scss";

import assetApi from '../../../services/assetApi'
import assetGroupApi from '../../../services/assetGroupApi'

function AssetTable() {
  const [assets, setAssets] = useState([])
  const [loading, setLoading] = useState(true)
  const getGroupOptions = async function () {

  }
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
      {
        Header: "Label",
        accessor: "Label",
      },
      {
        Header: "Purchase Date",
        accessor: "PurchaseDate",
      },
      {
        Header: "Asset Group",
        accessor: "AssetGroup"
      }
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
        ControlType: "Date"
    },
    Description: {
        ControlType: "Text"
    },
    AssetGroup: {
      ControlType: "Select",
      DataSource: assetGroupApi
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
