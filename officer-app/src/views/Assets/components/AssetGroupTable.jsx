import React from "react";
import CoreTable from "../../../components/Core/Table/CoreTable";
import "./AssetTable.scss";

import api from "../../../services/mockupApi";

function AssetGroupTable() {
  const data = React.useMemo(() => api.assetGroupApi(), []);
  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Description",
        accessor: "description",
      },
    ],
    []
  );
  return (
    <>
      <h3>Asset Group</h3>
      <CoreTable data={data} columns={columns}></CoreTable>
    </>
  );
}

export default AssetGroupTable;
