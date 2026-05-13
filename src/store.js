import { getContacts, createContact, updateContact, deleteContact as deleteContactApi, } from "./services/api";

export const initialStore = () => {
    return {
        contacts: [],
        loading: true,
    };
};

//dispatchers
export default function storeReducer(store, action = {}) {
    switch (action.type) {
        case "SET_CONTACTS":
            return {
                ...store,
                contacts: action.payload,
                loading: false,
            };

        case "ADD_CONTACT":
            return {
                ...store,
                contacts: [...store.contacts, action.payload],
            };

        case "UPDATE_CONTACT":
            return {
                ...store,
                contacts: store.contacts.map((contact) =>
                    contact.id === action.payload.id ? action.payload : contact
                ),
            };

        case "DELETE_CONTACT":
            return {
                ...store,
                contacts: store.contacts.filter((contact) => contact.id !== action.payload),
            };

        case "SET_LOADING":
            return {
                ...store,
                loading: action.payload,
            };

        default:
            throw Error("Unknown action: " + action.type);
    }
}

