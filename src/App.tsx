import React, { useCallback, useState } from "react";
import { ipcRenderer } from "electron";

import { CHANNELS } from "../common";

import classes from "./App.scss";

function App() {
  const [value, setValue] = useState("");

  const sendMessage = useCallback(() => {
    ipcRenderer.invoke(CHANNELS.COMMUNICATION, value).then(() => setValue(""));
  }, [value, setValue]);

  return (
    <div className={classes.wrapper}>
      <h1>Hello Electron!!!</h1>
      <p>We are using:</p>
      <ul>
        <li>Node.js {process?.versions?.node}</li>
        <li>Chromium {process?.versions?.chrome}</li>
        <li>Electron {process?.versions?.electron}</li>
      </ul>
      <input type="text" value={value} onChange={({ target }) => setValue(target.value)} />
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
}

export default App;
