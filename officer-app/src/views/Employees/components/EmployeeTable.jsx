import React, { useEffect, useState } from "react";
import CoreTable from "../../../components/Core/Table/CoreTable";
import "../EmployeeView.scss";

import employeeApi from '../../../services/employee-api'

function EmployeeTable() {
  const [employees, setEmployees] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const loadData = async function () {
    try {
      setLoading(true)
      const apiData = await employeeApi.get();
      setEmployees(apiData.data);
    } catch (error) {
      console.log(error)
      setEmployees([]);
      setError(true);
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    if (employees === null) loadData()
  }, [employees])
  const columns = React.useMemo(
    () => [
      {
        Header: "Full Name",
        accessor: "FullName",
      },
      {
        Header: "Position",
        accessor: "Position",
      },
      {
        Header: "Date of birth",
        accessor: "DOB",
      },
      {
        Header: "Email",
        accessor: "Email",
      }
    ],
    []
  );
  const employeeConf = {
    FullName: {
      ControlType: "Text",
      Required: true
    },
    Position: {
      ControlType: "Text",
      Required: true
    },
    DOB: {
      ControlType: "Date",
      Required: true
    },
    Email: {
      ControlType: "Text",
      Required: true
    },
    OIB: {
      ControlType: "Text",
      Required: true
    }
  }
  return (
    <>
      {!loading && employees !== null &&
        (
          <>
            <CoreTable createFormConf={employeeConf} apiService={employeeApi} setData={setEmployees} data={employees} columns={columns} title={'Employees'}></CoreTable>
          </>
        )
      }
    </>
  );
}

export default EmployeeTable;
