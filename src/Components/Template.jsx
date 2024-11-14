import React, { useState, useEffect } from 'react';

function Template() {
  const [loading, setLoading] = useState(true); // Track loading state
  const [pdfReady, setPdfReady] = useState(false); // Track if PDF is ready to display

  useEffect(() => {
    // Simulate loading delay (3 seconds)
    const timer = setTimeout(() => {
      setLoading(true); // Hide loading text after 3 seconds
      setPdfReady(true); // Set PDF as ready to display
    }, 3000); // Delay of 3 seconds

    // Cleanup function (optional, clears timeout on component unmount)
    return () => clearTimeout(timer);
  }, []); // Empty dependency array, so it runs once when component mounts

  return (
    <div className="template-page">
      <h1>Your Resume Template</h1>
      
      {loading ? (
        <p>Loading Resume...</p> // This text is shown while the resume is loading
      ) : (
        <div>
          {pdfReady && (
            <div>
              <embed
                src="your-pdf-path.pdf" // Replace with the actual path to your PDF file
                type="application/pdf"
                width="100%"
                height="600px"
                title="Generated Resume"
              />
              <div>
                <a href="your-pdf-path.pdf" download>
                  <button>Download Resume</button>
                </a>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Template;
