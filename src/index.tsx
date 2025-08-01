/**
 * @module index
 * @file This is the main entry point for the SolidJS application.
 * It initializes the SolidJS application and mounts the root component to the DOM.
 */

/* @refresh reload */
import { render } from "solid-js/web";
import App from "./App";
import "./App.css";

/**
 * Renders the main SolidJS application component (`App`) into the DOM.
 * The application is mounted to the HTML element with the ID 'root'.
 */
render(() => <App />, document.getElementById("root") as HTMLElement);
