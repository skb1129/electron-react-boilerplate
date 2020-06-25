import React from "react";

function App() {
  return (
    <div>
      <h1>Hello Electron!!!</h1>
      <p>We are using:</p>
      <ul>
        <li>Node.js {process?.versions?.node}</li>
        <li>Chromium {process?.versions?.chrome}</li>
        <li>Electron {process?.versions?.electron}</li>
      </ul>
    </div>
  );
}

export default App;
