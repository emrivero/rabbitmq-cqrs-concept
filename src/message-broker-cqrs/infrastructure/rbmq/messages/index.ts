import { AnotherRandomMessage } from './another-random.message';
import { ToolInstalledMessage } from './tool-installed.message';

export const RBMQ_MESSAGES = [
  new ToolInstalledMessage(),
  new AnotherRandomMessage(),
];
