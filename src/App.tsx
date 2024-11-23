import React, { useCallback, useEffect, useState } from 'react';
import Header from './components/Header';
import Grid from './components/Grid';
import { GET_TICKETS_URL } from './constants';
import { loadGrid, mapUsersByUserId } from './utils';
import { Ticket, User } from './interfaces';
import Loader from './components/Loader';
import './App.css';

function App() {
  // State for tickets data
  const [tickets, setTickets] = useState<Ticket[]>([]);
  // State to store user data mapped by user ID
  const [userData, setUserData] = useState<Record<string, User>>({});
  // State to store grouped and ordered grid data
  const [gridData, setGridData] = useState<Record<string, Ticket[]>>({});
  // State for grouping preference (e.g., by "status", "priority")
  const [grouping, setGrouping] = useState<string>("status");
  // State for ordering preference (e.g., by "priority", "title")
  const [ordering, setOrdering] = useState<string>("priority");
  // State to track loading status
  const [loading, setLoading] = useState(true);

  // Effect to fetch tickets and users data on component mount
  useEffect(() => {
    loadSettings(); // Load settings (grouping and ordering) from localStorage

    fetch(GET_TICKETS_URL)
      .then((resp) => resp.json())
      .then((res) => {
        const { tickets, users } = res;
        setTickets(tickets); // Save tickets to state
        setUserData(mapUsersByUserId(users)); // Map and save user data by user ID
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  // Effect to update grid data whenever tickets, grouping, or ordering change
  useEffect(() => {
    if (!tickets.length) return; // Exit if no tickets available
    setGridData(loadGrid(tickets, grouping, ordering)); // Load grid data based on grouping and ordering
    setLoading(false); // Set loading to false once grid data is prepared
  }, [grouping, ordering, tickets]);

  // Handler to update grouping preference
  const onSetGrouping = useCallback((value: string) => {
    setLoading(true); // Show loader during processing
    setGrouping(value); // Update grouping state
    saveSettings({ grouping: value }); // Save grouping preference to localStorage
  }, []);

  // Handler to update ordering preference
  const onSetOrdering = useCallback((value: string) => {
    setLoading(true); // Show loader during processing
    setOrdering(value); // Update ordering state
    saveSettings({ ordering: value }); // Save ordering preference to localStorage
  }, []);

  // Utility to save preferences to localStorage
  const saveSettings = useCallback((data: Record<string, string>) => {
    for (let key in data) {
      localStorage.setItem(key, data[key]); // Save each preference to localStorage
    }
  }, []);

  // Utility to load preferences from localStorage
  const loadSettings = useCallback(() => {
    setGrouping(localStorage.getItem("grouping") || "status"); // Load grouping or default to "status"
    setOrdering(localStorage.getItem("ordering") || "priority"); // Load ordering or default to "priority"
  }, []);

  return (
    <div className="App">
      {/* Header component with controls for grouping and ordering */}
      <Header
        grouping={grouping}
        setGrouping={onSetGrouping}
        ordering={ordering}
        setOrdering={onSetOrdering}
      />
      {/* Display loader or grid data based on loading state */}
      {loading ? (
        <Loader />
      ) : (
        <Grid gridData={gridData} grouping={grouping} userIdToData={userData} />
      )}
    </div>
  );
}

export default App;
