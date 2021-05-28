import * as model from "./tasks-model.js";
import * as lane from "./tasks-lanes.js";
import * as task from "./tasks-task.js";
import * as tasks from "./tasks-tasks.js";


export function useModel() {
  return {
    ...model,
    ...lane,
    ...task,
    ...tasks
  };
}