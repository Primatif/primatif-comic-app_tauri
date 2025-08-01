import { createSignal, onMount } from "solid-js";
import { invoke } from "@tauri-apps/api/core";
import { attachConsole, debug, info, error as logError } from "@tauri-apps/plugin-log";
import { Button } from "@kobalte/core/button";
import { TextField } from "@kobalte/core/text-field";
import "./App.css";

/**
 * Defines the structure for a message object, including its ID, text content, and 2D coordinates.
 */
interface Message {
  id: number;
  text: string;
  x: number;
  y: number;
}

/**
 * The main application component for the Primatif Comics app.
 * Manages a draggable text element with persistent storage via a Tauri backend.
 * It demonstrates the Responsive UI / Authoritative Backend architectural pattern.
 */
function App() {
  const [message, setMessage] = createSignal<Message>({ id: 0, text: "Hello World!", x: 50, y: 50 });
  const [isDragging, setIsDragging] = createSignal(false);

  let startX: number, startY: number;

  /**
   * Lifecycle hook that runs after the component is mounted.
   * It attaches the console for unified logging and fetches the latest message from the backend.
   * If no message exists, the local state retains its initial default values until explicitly saved.
   */
  onMount(async () => {
    const detach = await attachConsole();
    // You can detach the console later if needed
    // detach();

    try {
      const latestMessage = await invoke("get_message") as Message | null;
      if (latestMessage) {
        setMessage(latestMessage);
      }
      // If no message, message signal retains its initial default values.
      // The first save will create the entry.
    } catch (err) {
      logError(`Failed to fetch message on mount: ${String(err)}`);
    }
  });

  /**
   * Handles the mouse down event on the draggable element.
   * Initiates the dragging state and records the starting mouse position relative to the element.
   * @param e The MouseEvent object.
   */
  const onMouseDown = (e: MouseEvent) => {
    setIsDragging(true);
    startX = e.clientX - message().x;
    startY = e.clientY - message().y;
  };

  /**
   * Handles the mouse move event, updating the draggable element's position locally.
   * This function is called frequently during dragging to provide a responsive UI.
   * Backend updates are deferred until the 'Save' button is clicked.
   * @param e The MouseEvent object.
   */
  const onMouseMove = (e: MouseEvent) => {
    if (isDragging()) {
      const newX = e.clientX - startX;
      const newY = e.clientY - startY;
      setMessage(prev => ({ ...prev, x: newX, y: newY }));
      debug(`Dragging: x=${newX}, y=${newY}`);
    }
  };

  /**
   * Handles the mouse up event, ending the dragging state.
   * This function only updates the local state; it does not trigger a backend save.
   */
  const onMouseUp = () => {
    setIsDragging(false);
    // No backend call here. Local state is updated by onMouseMove.
  };

  /**
   * Handles input changes for the text field, updating the message's text content locally.
   * Backend updates are deferred until the 'Save' button is clicked.
   * @param e The Event object from the input field.
   */
  const onTextInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    setMessage(prev => ({ ...prev, text: target.value }));
  };

  /**
   * Handles the save action, persisting the current message's text and coordinates to the backend.
   * After a successful save, it re-fetches the latest state from the backend to ensure data consistency.
   */
  const onSave = async () => {
    const currentMessage = message();
    info(`Saving message: text=${currentMessage.text}, x=${currentMessage.x}, y=${currentMessage.y}`);
    try {
      await invoke("update_message", { text: currentMessage.text, newX: currentMessage.x, newY: currentMessage.y });
      info("Backend update successful. Re-fetching latest state.");
      const latestMessage = await invoke("get_message") as Message | null;
      if (latestMessage) {
        setMessage(latestMessage);
      }
    } catch (err) {
      logError(`Save failed: ${String(err)}`);
    }
  };

  return (
    <main
      class="bg-lime-50 flex flex-col items-center justify-center min-h-screen p-4 relative overflow-hidden"
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp} // Stop dragging if mouse leaves window
    >
      <div
        class="w-48 h-24 bg-indigo-600 text-white p-4 rounded-xl shadow-2xl transition-all duration-100 ease-out transform hover:scale-105 absolute cursor-grab active:cursor-grabbing flex flex-col items-center justify-center"
        style={{
          left: `${message().x}px`,
          top: `${message().y}px`,
        }}
        onMouseDown={onMouseDown}
      >
        <TextField class="w-full pt-6">
          <TextField.Input
            type="text"
            class="w-full text-center bg-transparent border-b border-white/50 focus:border-white outline-none text-white font-bold text-lg mb-1 pb-1"
            value={message().text}
            onInput={onTextInput}
          />
        </TextField>
        <span class="text-white/70 text-xs mt-1">ID: {message().id}</span>

        <div>
          <Button
            class="px-6 py-1 bg-purple-600 text-white font-semibold rounded-full shadow-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75 transition-colors duration-200"
            onClick={onSave}
          >
            Save
          </Button>
        </div>
      </div>


    </main>
  );
}

export default App;
