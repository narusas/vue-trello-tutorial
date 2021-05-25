export function titleChanged(task, changedTitle) {
    task.title = changedTitle;
}

export function  toggleDone(task) {
    console.log("done",task.done);
    task.done = !task.done;
}