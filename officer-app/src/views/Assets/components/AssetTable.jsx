import React, { useEffect, useState } from "react";
import CoreTable from "../../../components/Core/Table/CoreTable";
import "./AssetTable.scss";

import assetApi from '../../../services/assetApi'
import assetGroupApi from '../../../services/assetGroupApi'

function AssetTable({setSelectedAssets}) {
  const [assets, setAssets] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const getGroupOptions = async function () {

  }
  const loadData = async function () {
    try{
      setLoading(true)
      const apiData = await assetApi.get();
      setAssets(apiData.data);
    }catch(error){
      console.log(error)
      setAssets([]);
      setError(true);
    }finally{
      setLoading(false)
    }
}
  useEffect(()=>{
    if(assets?.length == 0 && !error) loadData()
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
      }
    ],
    []
  );
  const assetConf = {
    Name: {
        ControlType: "Text",
        Required: true
    },
    Label: {
        ControlType: "Text",
        Required: true
    },
    PurchaseDate: {
        ControlType: "Date",
        Required: true
    },
    Description: {
        ControlType: "Text"
    },
    AssetGroup: {
      ControlType: "Select",
      DataSource: assetGroupApi,
      Required: true
  }
}
  return (
    <>
      {!loading && 
      (
      <>
      <CoreTable setSelRows={setSelectedAssets} createFormConf={assetConf} apiService={assetApi} setData={setAssets} data={assets} columns={columns} title={'Assets'}></CoreTable>
      </>
      )
    }
    </>
  );
}

export default AssetTable;
