'use client';

import {useForm} from "react-hook-form";
import {Button, Col, Row} from "reactstrap";
import {post} from "@/core/httpClient";
import {useTestActions} from "@/contexts/testContext";
import {testAction} from "@/core/testAction";

export default function UserCreate() {

    const {
        register,
        watch,
        handleSubmit,
        formState: {errors},
    } = useForm({mode: "onSubmit"});

    const {state, dispatch} = useTestActions();

    return (
        <>
            <Row className="mb-5">
                <h5>Create User</h5>
            </Row>
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
            <Row>
                <Col className="d-flex justify-content-end">
                    <Button className="btn btn-primary" type="button" onClick={() => {
                        handleSubmit(async (data) => {
                            await post("/user/create", data);
                        })();
                    }}>
                        Submit
                    </Button>
                </Col>
            </Row>
        </>
    )
}
