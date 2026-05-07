const AGENDA_SLUG = "chipiUser";
const BASE_URL = "https://playground.4geeks.com/contact";
const AGENDA_URL = `${BASE_URL}/agendas/${AGENDA_SLUG}`;
const CONTACTS_URL = `${AGENDA_URL}/contacts`;

const ensureAgendaExists = async () => {
    const response = await fetch(AGENDA_URL);
    if (response.status === 404) {
        const createResponse = await fetch(AGENDA_URL, { method: "POST" });
        if (!createResponse.ok) throw new Error("Error al crear la agenda");
    }
};

export const getContacts = async () => {
    await ensureAgendaExists();
    const response = await fetch(CONTACTS_URL);
    if (!response.ok) throw new Error("Error al obtener contactos");
    const data = await response.json();
    return data.contacts || [];
};

export const getContactById = async (id) => {
    const contacts = await getContacts();
    return contacts.find((c) => c.id === parseInt(id)) || null;
};

export const createContact = async (contactData) => {
    await ensureAgendaExists();
    const response = await fetch(CONTACTS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactData),
    });
    if (!response.ok) throw new Error("Error al crear contacto");
    return await response.json();
};

export const deleteContact = async (id) => {
    const response = await fetch(`${CONTACTS_URL}/${id}`, {
        method: "DELETE",
    });
    if (!response.ok) throw new Error("Error al eliminar contacto");
};

export const updateContact = async (id, contactData) => {
    const response = await fetch(`${CONTACTS_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactData),
    });
    if (!response.ok) throw new Error("Error al actualizar contacto");
    return await response.json();
};