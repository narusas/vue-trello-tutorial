const fastifyCreateFunc = require("fastify");
const fastify = fastifyCreateFunc({logger:true});



const tasks = {
    laneList: ["lane1", "lane2", "lane3"],
    lanes: {
      "lane1": {
        id: "lane1",
        taskList: ["task-1", "task-2", "task-3"],
        title: "Backlogs"
      },
      "lane2": {
        id: "lane2",
        taskList: ["task-4"],
        title: "Work In Progress"
      },
      "lane3": {
        id: "lane3",
        taskList: ["task-5", "task-6"],
        title: "Done"
      }
    },
    tasks: {
      "task-1": {
        id: "task-1",
        laneId:"lane1",
        title: "모델 분리",
        done: false,
      },
      "task-2": {
        id: "task-2",
        laneId:"lane1",
        title: "서버 연동",
        done: false,
      },
      "task-3": {
        id: "task-3",
        laneId:"lane1",
        title: "node 서버 기초",
        done: false,
      },
      "task-4": {
        id: "task-4",
        laneId:"lane2",
        title: "trello 클론 기본",
        done: false,
      },
      "task-5": {
        id: "task-5",
        laneId:"lane3",
        title: "개발환경 배우기",
        done: true,
      },
      "task-6": {
        id: "task-6",
        laneId:"lane3",
        title: "vue 기초 배우기",
        done: true,
      },
  
    }
  
  }

fastify.get("/api/tasks", async(request, reply)=>{
    return tasks;
});

fastify.put("/api/lanes/:laneId", async(request, reply)=>{
    console.log("Params", request.params);
    console.log("Body", request.body);
    
    const {laneId} = request.params;
    const {title} = request.body;

    tasks.lanes[laneId].title = title;

    return {status:"OK"};
});

fastify.put("/api/tasks/:taskId", async(request, reply)=>{
    console.log("Params", request.params);
    console.log("Body", request.body);
    
    const {taskId} = request.params;
    const {title} = request.body;

    tasks.tasks[taskId].title = title;

    return {status:"OK"};
});

fastify.put("/api/tasks/:taskId/moveTo", async(request, reply)=>{
    console.log("Params", request.params);
    console.log("Body", request.body);
    
    const {taskId} = request.params;
    const {laneId, newIndex} = request.body;
    
    const task = tasks.tasks[taskId];
    const fromLane = tasks.lanes[task.laneId];
    const toLane = tasks.lanes[laneId];

    const oldIndex = fromLane.taskList.indexOf(taskId);
    if (oldIndex > -1){
        fromLane.taskList.splice(oldIndex,1);
    }

    toLane.taskList.splice(newIndex, 0, taskId);

    task.laneId = laneId;

    return {status:"OK"};
});

fastify.put("/api/tasks/:taskId/reposition", async(request, reply)=>{
    console.log("Params", request.params);
    console.log("Body", request.body);
    
    const {taskId} = request.params;
    const {oldIndex, newIndex} = request.body;
    
    const task = tasks.tasks[taskId];
    const lane = tasks.lanes[task.laneId];
    
    lane.taskList.splice(oldIndex,1); // delete
    lane.taskList.splice(newIndex, 0, taskId); // insert

    return {status:"OK"};
});

let lastTaskId = 100;

fastify.post("/api/tasks", async(request, reply)=>{
    console.log("Params", request.params);
    console.log("Body", request.body);
    
    
    const {laneId, title} = request.body;
    const newTask = {
        id: lastTaskId++,
        laneId, 
        title, 
        done: false
    }

    tasks.tasks[newTask.id] = newTask;
    tasks.lanes[laneId].taskList.push(newTask.id);

    return {status:"OK"};
});

// fastify.post("/api/tasks/:id/updateTitle", async(request, reply)=>{
//     return tasks;
// });

const start = async () => {
    try {
        await fastify.listen(3001);
    }
    catch(err) {
        console.log.error(err);
        process.exit(1);
    }
};

start();

