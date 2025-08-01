import { createSignal } from "solid-js";
import { invoke } from "@tauri-apps/api/core";
import { debug, info } from "@tauri-apps/plugin-log";
import "./App.css";

function App() {
  const [position, setPosition] = createSignal({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = createSignal(false);

  let startX: number, startY: number;

  const onMouseDown = (e: MouseEvent) => {
    setIsDragging(true);
    startX = e.clientX - position().x;
    startY = e.clientY - position().y;
  };

  const onMouseMove = (e: MouseEvent) => {
    if (isDragging()) {
      const newX = e.clientX - startX;
      const newY = e.clientY - startY;
      setPosition({ x: newX, y: newY });
      debug(`Dragging: x=${newX}, y=${newY}`);
    }
  };

  const onMouseUp = async () => {
    setIsDragging(false);
    const finalPosition = position();
    info(`Final position: x=${finalPosition.x}, y=${finalPosition.y}. Sending to backend.`);
    try {
      await invoke("update_message", { newX: finalPosition.x, newY: finalPosition.y });
      info("Backend update successful.");
    } catch (error) {
      info(`Backend update failed: ${error}`);
    }
  };

  return (
    <main
      class="w-screen h-screen flex items-center justify-center bg-gray-100"
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp} // Stop dragging if mouse leaves window
    >
      <div
        class="w-24 h-24 bg-blue-500 absolute cursor-grab active:cursor-grabbing"
        style={{
          left: `${position().x}px`,
          top: `${position().y}px`,
        }}
        onMouseDown={onMouseDown}
      ></div>
    </main>
  );
}

export default App;
