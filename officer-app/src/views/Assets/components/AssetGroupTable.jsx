import React, {useState, useEffect} from "react";
import CoreTable from "../../../components/Core/Table/CoreTable";
import "./AssetTable.scss";

import assetGroupApi from "../../../services/assetGroupApi";

function AssetGroupTable() {
  const [assetGroups, setAssetGroups] = useState([])
  const [loading, setLoading] = useState(true)

  const loadData = async function () {
    setLoading(true)
    const apiData = await assetGroupApi.get();
    setAssetGroups(apiData);
    setLoading(false)
  }
  useEffect(() => {
    if (assetGroups?.length == 0) loadData()
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
      {!loading && assetGroups?.data &&
        (
          <>
            <CoreTable createFormConf={assetGroupConf} apiService={assetGroupApi} setData={setAssetGroups} data={assetGroups.data} columns={columns} title={'Asset Groups'}></CoreTable>
          </>
        )
      }
    </>
  );
}

export default AssetGroupTable;
