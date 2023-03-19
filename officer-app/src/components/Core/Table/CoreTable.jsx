import { forwardRef, useState, useRef, useEffect } from "react";
import { useTable, useRowSelect, usePagination } from "react-table";

import "bootstrap/dist/css/bootstrap.min.css";

import BTable from "react-bootstrap/Table";
import './CoreTable.scss'
import PaginationCore from "./PaginationCore";
import CoreTableTools from "./CoreTableTools";
import CoreModal from "../Modal/CoreModal";
function CoreTable({setData, data, columns, title, createFormConf, createFunc, apiService }) {
    const IndeterminateCheckbox = forwardRef(
        ({ indeterminate, ...rest }, ref) => {
            const defaultRef = useRef();
            const resolvedRef = ref || defaultRef;

            useEffect(() => {
                resolvedRef.current.indeterminate = indeterminate;
            }, [resolvedRef, indeterminate]);

            return (
                <>
                    <input type="checkbox" ref={resolvedRef} {...rest} />
                </>
            );
        }
    );

    //Initial value could be used to preselect row ie. id:1 would select first row
    const [selectedRow, setSelectedRow] = useState({ id: -1 })

    const {
        getTableProps,
        headerGroups,
        page,
        prepareRow,
        selectedFlatRows,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { selectedRowIds, pageIndex, pageSize },
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0 },
        },
        usePagination,
        useRowSelect,
        (hooks) => {
            hooks.visibleColumns.push((columns) => [
                // Let's make a column for selection
                {
                    id: "selection",
                    // The header can use the table's getToggleAllRowsSelectedProps method
                    // to render a checkbox
                    Header: ({ getToggleAllRowsSelectedProps }) => (
                        <div>
                            <IndeterminateCheckbox
                                {...getToggleAllRowsSelectedProps()}
                            />
                        </div>
                    ),
                    // The cell can use the individual row's getToggleRowSelectedProps method
                    // to the render a checkbox
                    Cell: ({ row }) => (
                        <div>
                            <IndeterminateCheckbox
                                {...row.getToggleRowSelectedProps()}
                            />
                        </div>
                    ),
                },
                ...columns,
            ]);
        }
    );
    const [show, setShow] = useState(false);
    const [isInEdit, setIsInEdit] = useState(false);
    const handleClose = (dataChanged) =>{
        typeof(dataChanged) == 'boolean' && dataChanged && setData([])
        setShow(false)
    };

    const handleShow = (edit, row = null) => {
        setIsInEdit(edit);
        setShow(true);
    };

    const removeData = async () =>{
        debugger;
        let ids = selectedFlatRows.map((row) => {
            return row.original._id
        })
        await apiService.remove(ids)
        setData([])
    }
    return (
        <>
            <CoreModal handleClose={handleClose} modalProp={createFormConf} isInEdit={false} show={show} apiService={apiService} title={title}></CoreModal>
            <div className="table-title">
                <h3>{title}</h3>
            </div>
            <CoreTableTools create={handleShow} remove={removeData}></CoreTableTools>
            <div className="table-wrap">
                <BTable hover size="sm" {...getTableProps()}>
                    <thead>
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <th {...column.getHeaderProps()}>
                                        {column.render("Header")}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {page.map((row, i) => {
                            prepareRow(row);
                            return (
                                <tr className={selectedRow.id == row.id ? 'selected-row' : ''}
                                    {...row.getRowProps()}
                                    onClick={() => {
                                        setSelectedRow(row)
                                    }}
                                >
                                    {row.cells.map((cell) => {
                                        return (
                                            <td {...cell.getCellProps()}>
                                                {cell.render("Cell")}
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </BTable>
            </div>
            <PaginationCore gotoPage={gotoPage} canNextPage={canNextPage} canPreviousPage={canPreviousPage} nextPage={nextPage} previousPage={previousPage} setPageSize={setPageSize} pageSize={pageSize} pageOptions={pageOptions} pageIndex={pageIndex} />
        </>
    );
}

export default CoreTable;
