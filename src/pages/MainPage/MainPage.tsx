import { onMount } from 'solid-js';
import { ThreeColumnLayout } from '../../components/Layouts/ThreeColumnLayout';
import { LeftColumn } from './LeftColumn';
import { CenterColumn } from './CenterColumn';
import { RightColumn } from './RightColumn';
import { THEME_UTILS } from '../../styles/theme-utils';

/**
 * MainPage component for the Primatif Comics app.
 * This is the primary page that uses the ThreeColumnLayout with modular column components.
 * Each column is in its own directory for independent development.
 */
export function MainPage() {
  onMount(() => {
    THEME_UTILS.initTheme();
  });
  
  return (
    <ThreeColumnLayout
      leftSidebar={<LeftColumn />}
      centerContent={<CenterColumn />}
      rightSidebar={<RightColumn />}
    />
  );
}
