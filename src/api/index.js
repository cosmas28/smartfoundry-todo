import { createServer, Model, Response } from 'miragejs';

createServer({
  models: {
    todo: Model,
  },

  routes() {
    this.namespace = 'api';

		this.post("/todos", (schema, request) => {
			let attrs = JSON.parse(request.requestBody)
		
			return schema.todos.create({...attrs, id: Date.now})
		})

    this.get('/todos', async (schema, request) => {
      await sleep();
      const data = schema.todos.all();
      const searchPattern = new RegExp(decodeURI(request.queryParams.search), "i")
      let todos;

      if (request.queryParams.status === 'false' && request.queryParams.search) {
        todos = data.filter(todo => !todo.status && searchPattern.test(todo.title));
      } else if (request.queryParams.status === 'false' && !request.queryParams.search) {
        todos = data.filter(todo => !todo.status);
      } else if (request.queryParams.status === 'true' && request.queryParams.search) {
        todos = data.filter(todo => searchPattern.test(todo.title));
      } else if (request.queryParams.status === 'true' && !request.queryParams.search) {
        todos = data;
      }

      return todos;
    });

    this.patch('/todos/:id', async (schema, request) => {
      await sleep();
      const id = request.params.id;
      const todo = schema.todos.find(id);
      if (!todo) {
        return new Response(404);
      }
      const newAttrs = JSON.parse(request.requestBody);
      const errors = [];
      if (newAttrs.title?.trim()?.length === 0) {
        errors.push("title can't be blank");
      }
      if (newAttrs.body?.trim()?.length === 0) {
        errors.push("body can't be blank");
      }
      if (errors.length > 0) {
        return new Response(422, {}, { errors });
      }
      return todo.update(newAttrs);
    });

		this.delete("/todos/:id", (schema, request) => {
			let id = request.params.id
		
			return schema.todos.find(id).destroy()
		})
  },

  seeds(server) {
    server.create('todo', {
			id: Date.now(),
      status: false,
      title: 'Demo completed tickets',
      body:
        'This is a deep dive — THIS IS NOT a beginner-friendly todo. In this todo, I’m describing most of the React programming model from first principles. I don’t explain how to use it — just how it works.\n' +
        '\n' +
        'It’s aimed at experienced programmers and folks working on other UI libraries who asked about some tradeoffs chosen in React. I hope you’ll find it useful!',
    });
    server.create('todo', {
			id: Date.now(),
      status: true,
      title: 'Preparing for a Tech Talk, Part 1: Motivation',
      body:
        'What motivates you to give a talk?\n' +
        '\n' +
        'Maybe giving talks is a part of your current job. Maybe you want to gain more recognition in the industry so you can land a better job or get a raise. Maybe you’re out there to bring more attention to your hobby or work project.\n' +
        '\n' +
        'We’ll call these motivations external. They are about what other people think of you and your work. But if you already had all the respect and money that you wanted, would you still choose to give a talk? Why?',
    });
    server.create('todo', {
			id: Date.now(),
      status: false,
      title: 'Peer review in the afternoon',
      body:
        'For a while, the canonical answer has been that classes provide access to more features (like state). With Hooks, that’s not true anymore.\n' +
        '\n' +
        'Maybe you’ve heard one of them is better for performance. Which one? Many of such benchmarks are flawed so I’d be careful drawing conclusions from them. Performance primarily depends on what the code is doing rather than whether you chose a function or a class. In our observation, the performance differences are negligible, though optimization strategies are a bit different.',
    });
    server.create('todo', {
			id: Date.now(),
      status: false,
      title: 'Release changes to prod at midnight',
      body:
        'In this talk, my aim was to show why strict adherence to writing code that is free of duplication inevitably leads to software we can’t understand. While you could watch this talk by yourself, I tried to make it a good starting point for a team discussion. If you drop it in Slack, tell me what your teammates thought!\n' +
        '\n' +
        'I hope you’ll enjoy watching this talk as much as I enjoyed presenting it. I would like to thank Gary and the team for organizing a stellar conference. I’m also thankful to Sebastian, Sandi, and Cheng for the talks that inspired this one.\n' +
        '\n' +
        'I miss conferences. Hope to see you all soon.',
    });
  },
});

// Sleep for a random amount of time between 0 and 2 seconds
function sleep() {
  // eslint-disable-next-line no-undef
  if (process.env.NODE_ENV === 'development') {
    return new Promise(resolve => setTimeout(resolve, 1000 * 2 * Math.random()));
  }
  return Promise.resolve();
}
