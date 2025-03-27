import axios from "axios";

const API_URL = "http://127.0.0.1:5000";

export const getEntries = async () => {
    const res = await axios.get(`${API_URL}/entries`);
    return res.data;
};

export const addEntry = async (entry) => {
    const res = await axios.post(`${API_URL}/add`, entry);
    return res.data;
};

export const updateEntry = async (id, entry) => {
    const res = await axios.put(`${API_URL}/update/${id}`, entry);
    return res.data;
};

export const deleteEntry = async (id) => {
    const res = await axios.delete(`${API_URL}/delete/${id}`);
    return res.data;
};