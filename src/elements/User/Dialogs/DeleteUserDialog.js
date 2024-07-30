import {Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row} from "reactstrap";
import {useListActions} from "@/contexts/listActionContext";
import listAction from "@/core/listAction";
import {remove} from "@/core/httpClient";
import {toast} from "react-toastify";

export const DeleteUserDialog = ({isOpen}) => {
    const {state, dispatch} = useListActions();

    const toggle = () => dispatch({
        type: listAction.RESET,
    });

    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>
                Are you sure you want to remove this user?
            </ModalHeader>
            <ModalBody>
                <p>Id: {state.row.id}</p>
                <p>Email: {state.row.email}</p>
                <p>First name: {state.row.firstName}</p>
                <p>Last name: {state.row.lastName}</p>
                <p>Contact number: {state.row.contactNumber}</p>
            </ModalBody>
            <ModalFooter>
                <Row>
                    <Col className="d-flex justify-content-end">
                        <Button className="btn" color="primary" type="button" onClick={async () => {
                            let result = await remove(`/user/delete?userId=${state.row.id}`);
                            if (result && result.status === 200) {
                                toast.success("Deleted user successfully!")
                                dispatch({
                                    type: listAction.RELOAD,
                                });
                            }
                        }}>
                            Submit
                        </Button>
                    </Col>
                </Row>
                <Button color="secondary" onClick={toggle}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    )
}