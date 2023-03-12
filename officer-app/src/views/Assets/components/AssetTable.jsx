import React from "react";
import CoreTable from "../../../components/Core/Table/CoreTable";
import "./AssetTable.scss";

import api from "../../../services/mockupApi";

function AssetTable() {
  const data = React.useMemo(() => api.assetApi(), []);
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
      <CoreTable data={data} columns={columns} title={'Assets'}></CoreTable>
    </>
  );
}

export default AssetTable;
