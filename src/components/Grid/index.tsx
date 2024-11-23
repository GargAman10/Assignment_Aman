import React, { useMemo } from 'react';
import './grid.css';
import Column from '../Column/Column';
import { Ticket, User } from '../../interfaces';

/**
 * Grid Component
 * Renders a grid layout with columns representing grouped tickets.
 * 
 * @param {Record<string, Ticket[]>} gridData - A record containing groups of tickets to display.
 * @param {string} grouping - The current grouping criterion.
 * @param {Record<string, User>} userIdToData - A mapping of user IDs to user data.
 */
function Grid({ gridData, grouping, userIdToData }: { gridData: Record<string, Ticket[]>, grouping: string, userIdToData: Record<string, User> }) {
    // Memoize the keys of gridData to prevent unnecessary recalculations on re-renders
    const keys: string[] = useMemo(() => Object.keys(gridData), [gridData]);

    return (
        <div className='grid'>
            {/* Loop through each key in the gridData and render a Column component for each */}
            {keys.map((key: string) => (
                <Column 
                    key={key} 
                    tickets={gridData[key]}  // Pass the group of tickets associated with the key
                    grouping={grouping}      // Pass the current grouping criterion
                    groupBy={key}            // Pass the current key (grouping criteria)
                    userIdToData={userIdToData} // Pass the user data mapping
                />
            ))}
        </div>
    );
}

export default Grid;
