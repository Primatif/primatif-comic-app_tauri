import { LAYOUT, TYPOGRAPHY } from '../../../styles';
import { MAIN_PAGE } from '../constants';

/**
 * LeftColumn component for the Primatif Comics app.
 * Contains the tools sidebar with controls for the comic creation process.
 */
export function LeftColumn() {
  return (
    <div class={MAIN_PAGE.LEFT_COLUMN_WIDTH}>
      <h2 class={TYPOGRAPHY.SIDEBAR_HEADER}>Tools</h2>
      <div class={LAYOUT.SIDEBAR_CONTENT}>
        {/* Additional tools will go here */}
      </div>
    </div>
  );
}
