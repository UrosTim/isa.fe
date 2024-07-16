'use client';

import Link from "next/link";
import useListData from "@/hooks/useListData";
import {useEffect, useState} from "react";
import DataTable from "react-data-table-component"
import {Button, Modal, ModalBody, ModalFooter, ModalHeader, Row, Spinner} from "reactstrap";
import {useTestActions} from "@/contexts/testContext";
import {CiEdit, CiTrash} from "react-icons/ci";
import listAction from "@/core/listAction";
import {useListActions} from "@/contexts/listActionContext";
import {AllUserDialogs} from "@/elements/User/AllUserDialogs";

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
    },
    {
        name: 'Contact Number',
        selector: (row) => `${row.contactNumber}`,
        sortable: false,
    },
    {
        name: 'Options',
        selector: (row) => `${row.lastName}`,
        cell: (row) => {
            const {dispatch} = useListActions();
            return (
                <>
                    <Button
                        className="btn btn-light me-3"
                        onClick={() => {
                            dispatch({
                                type: listAction.UPDATE,
                                payload: row,
                            })
                        }}>
                        <CiEdit />
                    </Button>
                    <Button
                        className="btn btn-danger me-3"
                        onClick={() => {
                            dispatch({
                                type: listAction.DELETE,
                                payload: row,
                            })
                        }}>
                        <CiTrash />
                    </Button>
                </>
            )
        },
        sortable: false,
    }
]

export default function UserList() {

    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const {state, dispatch} = useListActions();

    const {getData, loading, data} = useListData(`user/get-page-list?pageNumber=${pageNumber-1}&pageSize=${pageSize}`);

    useEffect(() => {
        getData(`user/get-page-list?pageNumber=${pageNumber-1}&pageSize=${pageSize}`);
    }, [pageSize, pageNumber]);

    useEffect(() => {
        if (state.reload) {
            getData(`user/get-page-list?pageNumber=${pageNumber-1}&pageSize=${pageSize}`);
        }
    }, [state]);

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
            <AllUserDialogs />
        </>
    )
}