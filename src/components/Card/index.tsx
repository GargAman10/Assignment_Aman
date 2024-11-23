import React from 'react';
import './card.css';
import UserIcon from '../UserIcon';
import { LuMoreHorizontal } from 'react-icons/lu';
import { Ticket, User } from '../../interfaces';
import { getStatusIcon } from '../../utils/helper';

/**
 * Card Component
 * Displays information about a ticket including its ID, title, status, and associated tags.
 * Optionally displays the user profile icon and status icon based on props.
 *
 * @param {Ticket} ticket - The ticket details to display.
 * @param {User} userData - The user data associated with the ticket.
 * @param {boolean} hideStatusIcon - If true, hides the status icon.
 * @param {boolean} hideProfileIcon - If true, hides the profile icon.
 */
function Card({ 
  ticket, 
  userData, 
  hideStatusIcon, 
  hideProfileIcon 
}: { 
  ticket: Ticket, 
  userData: User, 
  hideStatusIcon: boolean, 
  hideProfileIcon: boolean 
}) {
  return (
    <div className="card">
      {/* Top container displays the ticket ID and user profile icon */}
      <div className="top-container">
        <div className="ticket-id">{ticket.id}</div>
        {!hideProfileIcon && (
          <UserIcon name={userData.name} available={userData.available} />
        )}
      </div>

      {/* Middle container displays the status icon and ticket title */}
      <div className="middle-container">
        {!hideStatusIcon && getStatusIcon(ticket.status)}
        <div className="title">{ticket.title}</div>
      </div>

      {/* Bottom container displays the tags and additional action icons */}
      <div className="bottom-container">
        <div className="more-icon-container">
          <LuMoreHorizontal color="#797d84" />
        </div>
        {ticket.tag.map((tag: string) => (
          <div key={tag} className="tag-container">
            <div className="tag-icon"></div>
            <div className="tag-text">{tag}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Card;
