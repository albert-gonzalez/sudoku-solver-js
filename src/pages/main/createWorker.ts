export const createWorker = () =>
  new Worker(new URL("../../workers/solverWorker.ts", import.meta.url));
