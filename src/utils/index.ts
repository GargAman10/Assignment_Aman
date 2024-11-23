import { Ticket, User } from "../interfaces";

/**
 * Groups tickets by their status.
 * @param tickets - Array of tickets to group.
 * @returns An object where keys are statuses, and values are arrays of tickets.
 */
export const groupTicketsByStatus = (tickets: Ticket[]) => {
    return tickets.reduce<Record<string, Ticket[]>>((groups, ticket) => {
        if (!groups[ticket.status]) {
            groups[ticket.status] = [];
        }
        groups[ticket.status].push(ticket);
        return groups;
    }, { "Backlog": [], "Todo": [], "In progress": [], "Done": [], "Canceled": [] });
};

/**
 * Groups tickets by their priority label.
 * @param tickets - Array of tickets to group.
 * @returns An object where keys are priority labels, and values are arrays of tickets.
 */
export const groupTicketsByPriority = (tickets: Ticket[]) => {
    return tickets.reduce<Record<string, Ticket[]>>((groups, ticket) => {
        const priorityLabel = getPriorityLabel(ticket.priority);
        if (!groups[priorityLabel]) {
            groups[priorityLabel] = [];
        }
        groups[priorityLabel].push(ticket);
        return groups;
    }, { "No priority": [], "Low": [], "Medium": [], "High": [], "Urgent": [] });
};

/**
 * Groups tickets by user ID.
 * @param tickets - Array of tickets to group.
 * @returns An object where keys are user IDs, and values are arrays of tickets.
 */
export const groupTicketsByUserId = (tickets: Ticket[]) => {
    return tickets.reduce<Record<string, Ticket[]>>((groups, ticket) => {
        if (!groups[ticket.userId]) {
            groups[ticket.userId] = [];
        }
        groups[ticket.userId].push(ticket);
        return groups;
    }, {});
};

/**
 * Maps users by their user ID.
 * @param users - Array of users to map.
 * @returns An object where keys are user IDs, and values are user objects.
 */
export const mapUsersByUserId = (users: User[]) => {
    return users.reduce<Record<string, User>>((map, user) => {
        map[user.id] = user;
        return map;
    }, {});
};

/**
 * Converts a numeric priority to its corresponding label.
 * @param priority - Priority value (0 to 4).
 * @returns A string representing the priority label.
 */
const getPriorityLabel = (priority: number) => {
    switch (priority) {
        case 0: return "No priority";
        case 1: return "Low";
        case 2: return "Medium";
        case 3: return "High";
        case 4: return "Urgent";
        default: return "NA";
    }
};

/**
 * Orders tickets by priority in descending order (highest priority first).
 * @param tickets - Array of tickets to sort.
 * @returns The sorted array of tickets.
 */
const orderByPriority = (tickets: Ticket[]) => 
    tickets.sort((a, b) => b.priority - a.priority);

/**
 * Orders tickets alphabetically by their title.
 * @param tickets - Array of tickets to sort.
 * @returns The sorted array of tickets.
 */
const orderByTitle = (tickets: Ticket[]) => 
    tickets.sort((a, b) => a.title.localeCompare(b.title));

/**
 * Loads tickets into a grouped and optionally ordered structure.
 * @param tickets - Array of tickets to process.
 * @param grouping - The property to group by ("status", "priority", "user").
 * @param ordering - The property to order by ("priority", "title").
 * @returns A grouped object of tickets based on the specified grouping and ordering.
 */
export const loadGrid = (tickets: Ticket[], grouping: string, ordering: string) => {
    const orderedTickets = ordering === "priority"
        ? orderByPriority(tickets)
        : orderByTitle(tickets);

    switch (grouping) {
        case "status": return groupTicketsByStatus(orderedTickets);
        case "priority": return groupTicketsByPriority(orderedTickets);
        case "user": return groupTicketsByUserId(orderedTickets);
        default: return groupTicketsByUserId(orderedTickets);
    }
};
