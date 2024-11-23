import React, { useCallback, useEffect, useRef, useState, ChangeEvent } from 'react';
import './displayDropdown.css';
import { LuSettings2 } from "react-icons/lu";
import { BiChevronDown } from "react-icons/bi";

/**
 * DisplayDropdown Component
 * A dropdown menu for configuring display settings, including grouping and ordering.
 *
 * @param {string} grouping - The current grouping criteria.
 * @param {(grouping: string) => void} setGrouping - Function to update the grouping criteria.
 * @param {string} ordering - The current ordering criteria.
 * @param {(ordering: string) => void} setOrdering - Function to update the ordering criteria.
 */
function DisplayDropdown({ 
  grouping, 
  setGrouping, 
  ordering, 
  setOrdering 
}: { 
  grouping: string, 
  setGrouping: (grouping: string) => void, 
  ordering: string, 
  setOrdering: (ordering: string) => void 
}) {
  // State to manage visibility of the dropdown
  const [visible, setVisible] = useState(false);

  // Ref to track the dropdown container element
  const componentRef = useRef<HTMLDivElement | null>(null);

  /**
   * Toggles the visibility of the dropdown.
   */
  const openDropdown = useCallback(() => {
    setVisible(true);
  }, []);

  /**
   * Hides the dropdown if the user clicks outside the component.
   */
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (componentRef.current && !componentRef.current.contains(event.target as Node)) {
      setVisible(false);
    }
  }, []);

  /**
   * Updates the grouping criteria when the dropdown option changes.
   */
  const onGroupingChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => setGrouping(e.target.value),
    [setGrouping]
  );

  /**
   * Updates the ordering criteria when the dropdown option changes.
   */
  const onOrderingChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => setOrdering(e.target.value),
    [setOrdering]
  );

  /**
   * Adds an event listener to detect clicks outside the dropdown.
   * Cleans up the event listener when the component is unmounted.
   */
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div className="display-dropdown" ref={componentRef}>
      {/* Dropdown label container */}
      <div className="dropdown-label-container" onClick={openDropdown}>
        <LuSettings2 color="#6b6f76" />
        <div className="dropdown-label">Display</div>
        <BiChevronDown color="#6b6f76" />
      </div>

      {/* Dropdown content container */}
      <div className={`dropdown-content-container ${visible ? "visible" : ""}`}>
        {/* Grouping options */}
        <div className="dropdown-content-row">
          <div className="dropdown-content-label">Grouping</div>
          <select 
            name="grouping" 
            id="grouping" 
            value={grouping} 
            onChange={onGroupingChange}
          >
            <option value="status">Status</option>
            <option value="user">User</option>
            <option value="priority">Priority</option>
          </select>
        </div>

        {/* Ordering options */}
        <div className="dropdown-content-row">
          <div className="dropdown-content-label">Ordering</div>
          <select 
            name="ordering" 
            id="ordering" 
            value={ordering} 
            onChange={onOrderingChange}
          >
            <option value="priority">Priority</option>
            <option value="title">Title</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default DisplayDropdown;
