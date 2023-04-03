import React, { useState, useEffect } from "react";
import CoreTable from "../../../components/Core/Table/CoreTable";
import "./AssetTable.scss";

import assetGroupApi from "../../../services/assetGroupApi";

function AssetGroupTable(actionBar) {
  const [assetGroups, setAssetGroups] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const loadData = async function () {
    try{
      setLoading(true)
      const apiData = await assetGroupApi.get();
      setAssetGroups(apiData.data);
    }catch(error){
      console.log(error)
      setAssetGroups([]);
      setError(true)
    }finally{
      setLoading(false)
    }
  }
  useEffect(() => {
    if (assetGroups?.length == 0 && !error) loadData()
  }, [assetGroups])
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
  const assetGroupConf = {
    Name: {
      ControlType: "Text"
    },
    Description: {
      ControlType: "Text"
    }
  }
  return (
    <>
      {!loading &&
        (
          <>
            <CoreTable actionBar={actionBar} createFormConf={assetGroupConf} apiService={assetGroupApi} setData={setAssetGroups} data={assetGroups} columns={columns} title={'Asset Groups'}></CoreTable>
          </>
        )
      }
    </>
  );
}

export default AssetGroupTable;
