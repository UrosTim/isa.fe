'use client';

import useListData from "@/hooks/useListData";
import {useEffect, useState} from "react";
import DataTable from "react-data-table-component"
import {Button, Card, CardBody, CardHeader, Spinner} from "reactstrap";
import {CiEdit, CiTrash} from "react-icons/ci";
import listAction from "@/core/listAction";
import {useListActions} from "@/contexts/listActionContext";
import {AllUserDialogs} from "@/elements/User/AllUserDialogs";
import {IoAddCircleOutline} from "react-icons/io5";

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
                        className="btn btn-primary me-3"
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
            <Card>
                <CardHeader className="d-flex justify-content-end">
                    <Button
                        className="btn btn-success me-3"
                        onClick={() => {
                            dispatch({
                                type: listAction.CREATE,
                            })
                        }}>
                        Create User <IoAddCircleOutline />
                    </Button>
                </CardHeader>
                <CardBody>
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
                </CardBody>
            </Card>
            <AllUserDialogs />
        </>
    )
}