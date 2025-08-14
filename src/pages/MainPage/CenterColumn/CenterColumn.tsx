import { LAYOUT } from '../../../styles';
import { MAIN_PAGE } from '../constants';
import { WorkspaceRenderer } from '../../../components/WorkspaceRenderer/WorkspaceRenderer';

/**
 * CenterColumn component for the Primatif Comics app.
 * Contains the main canvas workspace for comic creation.
 */
export function CenterColumn() {
  return (
    <div class={MAIN_PAGE.CENTER_COLUMN_WIDTH}>
      <div class={`${LAYOUT.CANVAS_WORKSPACE} h-full`}>
        <WorkspaceRenderer backgroundColor={0xFF0000} />
      </div>
    </div>
  );
}
