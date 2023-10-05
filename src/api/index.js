import { createServer, Model, Response } from 'miragejs';

createServer({
  models: {
    todo: Model,
  },

  routes() {
    this.namespace = 'api';

		this.post("/todos", (schema, request) => {
			let attrs = JSON.parse(request.requestBody)
		
			return schema.todos.create({...attrs, id: Date.now(), status: 'notStarted'})
		})

    this.get('/todos', async (schema, request) => {
      await sleep();
      const data = schema.todos.all();
      // const searchPattern = new RegExp(decodeURI(request.queryParams.search), "i")
      // let todos;

      // if (request.queryParams.status === 'false' && request.queryParams.search) {
      //   todos = data.filter(todo => !todo.status && searchPattern.test(todo.title));
      // } else if (request.queryParams.status === 'false' && !request.queryParams.search) {
      //   todos = data.filter(todo => !todo.status);
      // } else if (request.queryParams.status === 'true' && request.queryParams.search) {
      //   todos = data.filter(todo => searchPattern.test(todo.title));
      // } else if (request.queryParams.status === 'true' && !request.queryParams.search) {
      //   todos = data;
      // }

      return data;
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
      status: 'notStarted',
      title: 'Demo completed tickets',
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
