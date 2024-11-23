// Importing React for creating a functional component
import React from 'react';
// Importing CSS file for styling the UserIcon component
import './usericon.css';

// Functional component to represent a user's icon and status
function UserIcon({ name, available }: { name: string; available: boolean }) {
    // Using React's useMemo hook to optimize performance by memoizing the initials
    const initials = React.useMemo(() => {
        // Splitting the name into parts, extracting the first letter of each part, and joining them
        return name
            .split(" ")
            .map((part: string) => part.charAt(0))
            .join("");
    }, [name]); // Dependency array ensures this computation only runs when 'name' changes

    return (
        <div className="usericon-container">
            {/* Displaying the user's initials */}
            <div className="usericon-initials">{initials}</div>
            {/* Showing the user's availability status with a dynamic class */}
            <div
                className={`user-status ${available ? "online" : "offline"}`}
            ></div>
        </div>
    );
}

// Exporting the component to use it in other parts of the application
export default UserIcon;
