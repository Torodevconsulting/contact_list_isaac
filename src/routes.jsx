import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import ContactPage from "./pages/ContactPage";
import AddContactForm from "./pages/AddContactForm";
import ContactDetail from "./pages/ContactDetail";
import EditContactForm from "./pages/EditContactForm";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>}>
            <Route index element={<ContactPage />} />
            <Route path="add-contact" element={<AddContactForm />} />
            <Route path="contact/:contactId" element={<ContactDetail />} />
            <Route path="edit-contact/:contactId" element={<EditContactForm />} />
        </Route>
    )
);