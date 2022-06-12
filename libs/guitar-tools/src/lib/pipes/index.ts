import { ActivePressesPipe } from './active-presses.pipe';
import { FretDotPipe } from './fret-dot.pipe';
import { IncludesStringPipe } from './includes-string.pipe';
import { IsMutedPipe } from './is-muted.pipe';
import { StringTypePipe } from './string-type.pipe';
import { TabStringTypePipe } from './tab-string-type.pipe';

export * from './active-presses.pipe';
export * from './fret-dot.pipe';
export * from './includes-string.pipe';
export * from './is-muted.pipe';
export * from './string-type.pipe';
export * from './tab-string-type.pipe';

export const GUITAR_TOOLS_PIPES = [
  IncludesStringPipe,
  ActivePressesPipe,
  IsMutedPipe,
  StringTypePipe,
  TabStringTypePipe,
  FretDotPipe,
];
