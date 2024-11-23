import React from 'react';
import './loader.css';

/**
 * Loader Component
 * Displays a loading spinner or text to indicate data is being loaded.
 *
 * @param {boolean} fullscreen - Determines if the loader should cover the entire screen.
 * Defaults to true, making the loader fullscreen.
 */
function Loader({ fullscreen = true }: { fullscreen?: boolean }) {
    return (
        // Apply the 'fullscreen' class if the fullscreen prop is true
        <div className={`loader-container ${fullscreen ? "fullscreen" : ""}`}>
            {/* Display the loader text */}
            <span className='loader'>Loading...</span>
        </div>
    );
}

export default Loader;
