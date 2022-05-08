const mongoose = require('mongoose');
const uri = `mongodb+srv://root-user:${process.env.MONGO_DB_ROOT_USER_PWD}@cluster0.mgksx.mongodb.net/team-todo-app-db?retryWrites=true&w=majority`;

async function begin() {
  await mongoose.connect(uri);
}
async function end() {
  await mongoose.connection.close();
}

const todosSchema = new mongoose.Schema({
  title: String,
  priority: Number,
  dueDate: Number,
  createdBy: String,
  assignedTo: String,
});
const Todos = mongoose.model('todos', todosSchema);

const requestUrlPrefix = process.env.NODE_ENV === 'development' ? '/proxy' : '';

module.exports = {
  initRequestHandler: (webAppModule) => {
    webAppModule.post(`${requestUrlPrefix}/todos`, async (req, res) => {
      try {
        await begin();
        const newTodo = new Todos(req.body);
        const todoCreatedData = await newTodo.save();
        res.send({ documentCreated: true, todoCreatedData });
      } catch (error) {
        res.send(error);
      } finally {
        await end();
      }
    });
    webAppModule.get(`${requestUrlPrefix}/todos`, async (req, res) => {
      try {
        await begin();
        const todosDocuments = await Todos.find();
        res.send({ todos: todosDocuments });
      } catch (error) {
        res.send(error);
      } finally {
        await end();
      }
    });
  },
};
