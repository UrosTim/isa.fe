'use client';

import Link from "next/link";
import useListData from "@/hooks/useListData";
import {useEffect, useState} from "react";
import DataTable from "react-data-table-component"
import {Spinner} from "reactstrap";

export const tableColumns = [
    {
        name: 'First Name',
        selector: (row) => `${row.firstName}`,
        sortable: false,
    },
    {
        name: 'Last Name',
        selector: (row) => `${row.lastName}`,
        sortable: false,
    }
]

export default function UserList() {

    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const {getData, loading, data} = useListData(`user/get-user-page-list?pageNumber=${pageNumber-1}&pageSize=${pageSize}`);

    useEffect(() => {
        getData(`user/get-user-page-list?pageNumber=${pageNumber-1}&pageSize=${pageSize}`);
    }, [pageSize, pageNumber]);

    const handlePageNumber = async (page) => {
        setPageNumber(page);
    }

    const handlePerRowChange = async (newPerPage, page) => {
        setPageNumber(page);
        setPageSize(newPerPage);
    };

    return (
        <>
            {data != null && <DataTable data={data.users}
                       columns={tableColumns}
                       striped={true}
                       noHeader={true}
                       pagination
                       paginationServer
                       progresPending={loading}
                       paginationTotalRows={data.totalElements}
                       onChangePage={handlePageNumber}
                       onChangeRowsPerPage={handlePerRowChange}
                       progressComponent={<Spinner color="danger">Loading...</Spinner>}
                       highlightOnHover
                       />}
        </>
    )
}