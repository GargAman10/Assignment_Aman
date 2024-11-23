import React, { useMemo } from 'react';
import Card from '../Card';
import './column.css';
import { GrAdd } from 'react-icons/gr';
import { LuMoreHorizontal } from 'react-icons/lu';
import { Ticket, User } from '../../interfaces';
import { getPriorityIcon, getStatusIcon } from '../../utils/helper';
import UserIcon from '../UserIcon';

/**
 * Column Component
 * Displays a collection of tickets grouped by a specific criterion (status, priority, or user).
 *
 * @param {Ticket[]} tickets - List of tickets in the column.
 * @param {string} grouping - The current grouping criterion (status, priority, or user).
 * @param {string} groupBy - The specific group value (e.g., "Done", "High", or userId).
 * @param {Record<string, User>} userIdToData - Mapping of user IDs to user data.
 */
function Column({ 
  tickets, 
  grouping, 
  groupBy, 
  userIdToData 
}: { 
  tickets: Ticket[], 
  grouping: string, 
  groupBy: string, 
  userIdToData: Record<string, User> 
}) {
  // Determine the column title based on the grouping
  const title = useMemo(() => {
    if (grouping === 'status') return groupBy;
    if (grouping === 'priority') return groupBy;
    if (grouping === 'user') return userIdToData[groupBy]?.name || 'Unknown User';
  }, [grouping, groupBy, userIdToData]);

  // Determine the appropriate icon based on the grouping
  const icon = useMemo(() => {
    if (grouping === 'status') return getStatusIcon(groupBy);
    if (grouping === 'priority') return getPriorityIcon(groupBy);
    if (grouping === 'user') {
      const user = userIdToData[groupBy];
      return user ? <UserIcon name={user.name} available={user.available} /> : null;
    }
  }, [grouping, groupBy, userIdToData]);

  return (
    <div className="column">
      {/* Column Header */}
      <div className="column-header">
        <div className="column-header-left-container">
          {icon}
          <div className="column-title">
            {title}
            <span className="count">({tickets.length})</span>
          </div>
        </div>
        <div className="column-header-right-container">
          {/* Add and More options icons */}
          <GrAdd color="#797d84" size={12} />
          <LuMoreHorizontal color="#797d84" size={14} />
        </div>
      </div>

      {/* Cards container to display all tickets */}
      <div className="cards-container">
        {tickets.map((ticket: Ticket) => (
          <Card 
            key={ticket.id} 
            ticket={ticket} 
            userData={userIdToData[ticket.userId]} 
            hideStatusIcon={grouping === 'status'} 
            hideProfileIcon={grouping === 'user'} 
          />
        ))}
      </div>
    </div>
  );
}

export default Column;
