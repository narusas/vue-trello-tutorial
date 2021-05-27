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
        title: "모델 분리",
        done: false,
      },
      "task-2": {
        id: "task-2",
        title: "서버 연동",
        done: false,
      },
      "task-3": {
        id: "task-3",
        title: "node 서버 기초",
        done: false,
      },
      "task-4": {
        id: "task-4",
        title: "trello 클론 기본",
        done: false,
      },
      "task-5": {
        id: "task-5",
        title: "개발환경 배우기",
        done: true,
      },
      "task-6": {
        id: "task-6",
        title: "vue 기초 배우기",
        done: true,
      },
  
    }
  
  }

fastify.get("/api/tasks", async(request, reply)=>{
    return tasks;
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

