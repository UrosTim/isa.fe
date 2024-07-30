import {Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row} from "reactstrap";
import {useListActions} from "@/contexts/listActionContext";
import listAction from "@/core/listAction";
import {useForm} from "react-hook-form";
import {post} from "@/core/httpClient";
import {toast} from "react-toastify";

export const CreateUserDialog = ({isOpen}) => {
    const {dispatch} = useListActions();

    const toggle = () => dispatch({
        type: listAction.RESET,
    });

    const {
        register,
        watch,
        handleSubmit,
        formState: {errors},
        setValue,
    } = useForm({
        mode: "onSubmit",
    });

    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>
                Update User Info
            </ModalHeader>
            <ModalBody>
                <Row className="mb-4">
                    <Col md={6}>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="First Name"
                            {...register("firstName", {
                                required: "First Name is required.",
                                maxLength: 50,
                                minLength: 2,
                            })} />
                        {errors && errors.firstName && (
                            <span className="text-danger">
                            {errors.firstName.message}
                        </span>
                        )}
                    </Col>
                    <Col md={6}>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Last Name"
                            {...register("lastName", {
                                required: "Last Name is required.",
                                maxLength: 50,
                                minLength: 2,
                            })} />
                        {errors && errors.lastName && (
                            <span className="text-danger">
                            {errors.lastName.message}
                        </span>
                        )}
                    </Col>
                </Row>
                <Row className="mb-4">
                    <Col md={6}>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Email"
                            {...register("email", {
                                required: "Email is required.",
                            })} />
                        {errors && errors.email && (
                            <span className="text-danger">
                            {errors.email.message}
                        </span>
                        )}
                    </Col>
                    <Col md={6}>
                        <input type="text"
                               className="form-control"
                               placeholder="Contact Number"
                               {...register("contactNumber", {
                                   required: "Contact Number is required.",
                                   maxLength: 13,
                                   minLength: 9,
                                   validate: (value) => {
                                       if (!/^[0-9]*$/.test(value)) {
                                           return "Please enter a valid number";
                                       }
                                   }
                               })} />
                        {errors && errors.contactNumber && (
                            <span className="text-danger">
                            {errors.contactNumber.message}
                        </span>
                        )}
                    </Col>
                </Row>
                <Row className="mb-4">
                    <Col md={12}>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            {...register("password", {
                                required: "Password is required.",
                            })} />
                        {errors && errors.password && (
                            <span className="text-danger">
                            {errors.password.message}
                        </span>
                        )}
                    </Col>
                </Row>
            </ModalBody>
            <ModalFooter>
                <Row>
                    <Col className="d-flex justify-content-end">
                        <Button className="btn" color="primary" type="button" onClick={() => {
                            handleSubmit(async (data) => {
                                let result = await post("/user/create", data);
                                if (result && result.status === 200) {
                                    toast.success("Created user successfully!")
                                    dispatch({
                                        type: listAction.RELOAD,
                                    });
                                }
                            })();
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