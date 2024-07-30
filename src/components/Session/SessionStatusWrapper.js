import {useSession} from "next-auth/react";
import {Row, Spinner} from "reactstrap";

export default function SessionStatusWrapper({children}) {
    const {data: session, status} = useSession();

    return (
        <>
            {status === "loading" ?
                <Row className="min-vh-100 justify-content-center align-items-center">
                    <Spinner />
                </Row> :
                <>
                    {children}
                </>}
        </>
    );
}