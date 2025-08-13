import { JSX } from 'solid-js';
import { LAYOUT } from '../../../styles';

interface ThreeColumnLayoutProps {
  leftSidebar: JSX.Element;
  centerContent: JSX.Element;
  rightSidebar: JSX.Element;
}

/**
 * ThreeColumnLayout component for the Primatif Comics app.
 * Provides the standard three-column layout with flexible center and fixed-width sidebars.
 */
export function ThreeColumnLayout(props: ThreeColumnLayoutProps) {
  return (
    <main class={LAYOUT.MAIN_CONTAINER}>
      {/* Three-Column Main Layout */}
      <div class={LAYOUT.THREE_COLUMN}>
        
        {/* Left Sidebar - Tools & Controls */}
        <div class={LAYOUT.LEFT_SIDEBAR}>
          {props.leftSidebar}
        </div>

        {/* Center Canvas Area - Main Workspace */}
        <div class={LAYOUT.CENTER_CANVAS}>
          {props.centerContent}
        </div>

        {/* Right Sidebar - Navigation & Collections */}
        <div class={LAYOUT.RIGHT_SIDEBAR}>
          {props.rightSidebar}
        </div>
      </div>
    </main>
  );
}
