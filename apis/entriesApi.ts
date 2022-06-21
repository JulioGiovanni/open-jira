import axios from "axios";

// const entriesApi = {
//     getEntries: () => axios.get("/api/entries"),
//     postEntry: (entry: any) => axios.post("/api/entries", entry)
// }
const entriesApi = axios.create({
    baseURL: "/api",
});

export default entriesApi;