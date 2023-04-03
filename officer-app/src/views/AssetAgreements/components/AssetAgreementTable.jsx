import React, { useEffect, useState } from "react";
import CoreTable from "../../../components/Core/Table/CoreTable";
import '../AssetAgreementView.scss'

import AssetAgreementApi from '../../../services/asset-agreement-api'

function AssetAgreementTable() {
  const [AssetAgreements, setAssetAgreements] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const loadData = async function () {
    try {
      setLoading(true)
      const apiData = await AssetAgreementApi.get();
      setAssetAgreements(apiData.data);
    } catch (error) {
      console.log(error)
      setAssetAgreements([]);
      setError(true);
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    if (AssetAgreements === null) loadData()
  }, [AssetAgreements])
  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "Name",
      },
      {
        Header: "Reason",
        accessor: "Reason",
      },
      {
        Header: "DocumentURL",
        accessor: "DocumentURL",
      }
    ],
    []
  );
  const AssetAgreementConf = {
    Name: {
      ControlType: "Text",
      Required: true
    },
    Reason: {
      ControlType: "Text",
      Required: true
    },
    DocumentURL: {
      ControlType: "Text",
      Required: true
    }
  }
  return (
    <>
      {!loading && AssetAgreements !== null &&
        (
          <>
            <CoreTable createFormConf={AssetAgreementConf} apiService={AssetAgreementApi} setData={setAssetAgreements} data={AssetAgreements} columns={columns} title={'AssetAgreements'}></CoreTable>
          </>
        )
      }
    </>
  );
}

export default AssetAgreementTable;
