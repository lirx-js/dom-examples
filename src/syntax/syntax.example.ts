import { recursiveExample } from '../recursive/recursive.example';
import { rxAsyncExample } from './rx-async/rx-async.example';
import { rxForLoopExample } from './rx-for-loop/rx-for-loop.example';
import { rxIfExample } from './rx-if/rx-if.example';
import { rxInjectSlotExample } from './rx-inject-slot/rx-inject-slot.example';
import { reactiveTextExample } from './text/reactive-text.example';

export function syntaxExample(): void {
  // reactiveTextExample();
  // rxIfExample();
  // rxForLoopExample();
  rxInjectSlotExample();
  // rxAsyncExample();
}
