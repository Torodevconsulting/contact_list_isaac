import { getContacts, createContact, updateContact, deleteContact as deleteContactApi, } from "./services/api";

export const initialStore = () => {
    return {
        contacts: [],
        loading: true,
    };
};

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

//dispatchers
export const fetchContacts = async (dispatch) => {
    try {
        const contacts = await getContacts();
        dispatch({ type: "SET_CONTACTS", payload: contacts });
    } catch (error) {
        console.error("Error fetching contacts:", error);
        dispatch({ type: "SET_LOADING", payload: false });
    }
};

export const addContact = async (dispatch, contactData) => {
    try {
        const newContact = await createContact(contactData);
        dispatch({ type: "ADD_CONTACT", payload: newContact });
        return true;
    } catch (error) {
        console.error("Error creating contact:", error);
        return false;
    }
};

export const editContact = async (dispatch, id, contactData) => {
    try {
        const updated = await updateContact(id, contactData);
        dispatch({ type: "UPDATE_CONTACT", payload: updated });
        return true;
    } catch (error) {
        console.error("Error updating contact:", error);
        return false;
    }
};

export const removeContact = async (dispatch, id) => {
    try {
        await deleteContactApi(id);
        dispatch({ type: "DELETE_CONTACT", payload: id });
        return true;
    } catch (error) {
        console.error("Error deleting contact:", error);
        return false;
    }
};