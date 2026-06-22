const mockTickets = [
  {
    id: "mock-ticket-1",
    title: "Login page returns 500 error",
    description: "Customers cannot log in after the latest deployment.",
    status: "OPEN",
    priority: "URGENT",
    assignee: "alice",
    createdAt: "2026-06-20T08:30:00.000Z",
    updatedAt: "2026-06-20T08:30:00.000Z",
  },
  {
    id: "mock-ticket-2",
    title: "Billing receipt email is delayed",
    description: "Receipt emails are arriving more than 30 minutes after payment.",
    status: "IN_PROGRESS",
    priority: "HIGH",
    assignee: "rahul",
    createdAt: "2026-06-19T11:15:00.000Z",
    updatedAt: "2026-06-20T06:10:00.000Z",
  },
  {
    id: "mock-ticket-3",
    title: "Update help center article",
    description: "Add new password reset steps to the public help center.",
    status: "RESOLVED",
    priority: "LOW",
    assignee: "meera",
    createdAt: "2026-06-18T14:45:00.000Z",
    updatedAt: "2026-06-19T09:20:00.000Z",
  },
];

module.exports = mockTickets;
