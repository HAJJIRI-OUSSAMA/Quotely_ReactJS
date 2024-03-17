import http from "./http_common";

export async function addQuote(q) {
    return await http.post('/quotes', q);
}

export async function getAllQuotes() {
    return await http.get('/quotes');
}

export async function getQuoteById(id) {
    return await http.get(`/quotes/${id}`);
}

export async function deleteQuote(idQ) {
    return await http.delete(`/quotes/${idQ}`);
}

export async function updateQuote(q, id) {
    return await http.patch(`/quotes/${id}`, q);
}