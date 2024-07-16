import {createContext, useContext, useReducer} from "react";
import listAction from "@/core/listAction";

const initialState = {
    type: null,
    row: {},
    reload: false,
}
const listActionContext = createContext();

const listActionReducer = (state, action) => {
    switch (action.type) {
        case listAction.RELOAD:
            return {...initialState, reload: true};
        case listAction.UPDATE:
            return {...state, row: action.payload, type: listAction.UPDATE};
        case listAction.RESET:
            return initialState;
        default:
            return state;
    }
};

const ListActionProvider = ({children}) => {
    const [state, dispatch] = useReducer(listActionReducer, initialState);

    const value = {state, dispatch};

    return (
        <listActionContext.Provider value={value}>
            {children}
        </listActionContext.Provider>
    );
};

const useListActions = () => {
    const context = useContext(listActionContext);

    if (context === undefined) {
        throw new Error("listActions must be used within a ListActionProvider");
    }

    return context;
};

export {ListActionProvider, useListActions};