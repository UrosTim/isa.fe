import {createContext, useContext, useReducer} from "react";
import {testAction} from "@/core/testAction";

const initialState = {
    firstName: "John",
    email: "john@gmail.com",
}
const testContext = createContext();

const testReducer = (state, action) => {
    switch (action.type) {
        case testAction.CHANGE_EMAIL:
            return {...state, email: action.payload};
        case testAction.CHANGE_FIRST_NAME:
            return {...state, firstName: action.payload};
        default:
            return state;
    }
};

const TestProvider = ({ children }) => {
    const [state, dispatch] = useReducer(testReducer, initialState);

    const value = {state, dispatch};

    return (
        <testContext.Provider value={value}>
            {children}
        </testContext.Provider>
    );
};

const useTestActions = () => {
    const context = useContext(testContext);

    if (context === undefined) {
        throw new Error("useTestActions must be used within contexts");
    }

    return context;
};

export { TestProvider, useTestActions };

// switch (action.type) {
//     case USER_ACTIONS.UpdateContactDetails: {
//         return {
//             type: USER_ACTIONS.UpdateContactDetails,
//             row: action.row,
//         };
//     }
//     case 'reset': {
//         return {
//             type: null,
//             row: {},
//             reload: action.reload ?? false,
//         };
//     }
//     default: {
//         throw new Error(`Unknown action type ${action.type}`);
//     }
// }