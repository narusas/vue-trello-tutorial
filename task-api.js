const fastifyFactory = require('fastify')
const fastify = fastifyFactory({logger: true})

const data = [
    {
        laneId: "lane001",
        name: "Backlogs",
        tasks: [
            {
                taskId: "task001",
                text: "Do a mobile first layout",
                archived: false
            },
            {
                taskId: "task002",
                text: "Check the responsive layout",
                archived: true
            },
            {
                taskId: "task003",
                text: "Check the meta tags",
                archived: false
            }
        ]
    },
    {
        laneId: "lane002",
        name: "Done",
        tasks: []
    }
];

fastify.get("/", async (request, reply)=>{
    return "Hello World";
});


fastify.get("/tasks", async (request, reply)=>{
    return data;
});

const start = async ()=>{
    try {
        await fastify.listen(4001);
    }
    catch(err) {
        process.exit(1);
    }
}

start();


