// Interface for a Ticket, representing individual task or item details
export interface Ticket {
    id: string;           // Unique identifier for the ticket
    title: string;        // Title or name of the ticket
    tag: string[];        // Array of tags associated with the ticket (e.g., categories or labels)
    userId: string;       // ID of the user assigned to this ticket
    status: string;       // Current status of the ticket (e.g., "Todo", "In progress")
    priority: number;     // Numeric value indicating priority (e.g., 0 = No Priority, 1 = Low, etc.)
}

// Interface for a User, representing details of a user
export interface User {
    id: string;           // Unique identifier for the user
    name: string;         // Name of the user
    available: boolean;   // Availability status of the user (true = available, false = not available)
}

// Interface for a Column, representing a collection of tickets grouped by a specific criterion
export interface Col {
    col: Ticket[];        // Array of tickets in the column
}

// Interface for mapping user data by user ID
export interface UserIdToData {
    userData: Record<string, User>; // Record object with user ID as key and User object as value
}
