import { API_BASE_URL, HEALTH_URL } from "../config.js";

const TICKETS_URL = `${API_BASE_URL}/tickets`;

async function handleResponse(response) {
  if (!response.ok) {
    let message = `Request failed (${response.status})`;

    try {
      const body = await response.json();
      if (body?.message) {
        message = body.message;
      }
    } catch (error) {
      // The API should return JSON errors, but this keeps browser errors readable.
    }

    throw new Error(message);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export async function getServerHealth() {
  return fetch(HEALTH_URL).then(handleResponse);
}

export async function getTickets(status) {
  const url = status ? `${TICKETS_URL}?status=${encodeURIComponent(status)}` : TICKETS_URL;
  return fetch(url).then(handleResponse);
}

export async function getTicketById(id) {
  return fetch(`${TICKETS_URL}/${encodeURIComponent(id)}`).then(handleResponse);
}

export async function createTicket(payload) {
  return fetch(TICKETS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).then(handleResponse);
}

export async function updateTicket(id, payload) {
  return fetch(`${TICKETS_URL}/${encodeURIComponent(id)}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).then(handleResponse);
}

export async function deleteTicket(id) {
  return fetch(`${TICKETS_URL}/${encodeURIComponent(id)}`, {
    method: "DELETE",
  }).then(handleResponse);
}
