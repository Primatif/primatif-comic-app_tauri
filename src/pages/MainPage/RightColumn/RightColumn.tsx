import { LAYOUT, TYPOGRAPHY } from '../../../styles';
import { MAIN_PAGE } from '../constants';

/**
 * RightColumn component for the Primatif Comics app.
 * Contains navigation panel, pages, and layers for comic creation.
 */
export function RightColumn() {
  return (
    <div class={MAIN_PAGE.RIGHT_COLUMN_WIDTH}>
      <h2 class={TYPOGRAPHY.SIDEBAR_HEADER}>Navigation</h2>
      <div class={LAYOUT.SIDEBAR_CONTENT}>
        {/* Additional tools will go here */}
      </div>
    </div>
  );
}
