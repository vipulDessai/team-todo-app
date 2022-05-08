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
  completed: Boolean,
});
const Todos = mongoose.model('todos', todosSchema);

const usersSchema = new mongoose.Schema({
  name: String,
});
const Users = mongoose.model('users', usersSchema);

const requestUrlPrefix = process.env.NODE_ENV === 'development' ? '/proxy' : '';

module.exports = {
  initRequestHandler: (webAppModule) => {
    webAppModule.post(`${requestUrlPrefix}/users`, async (req, res) => {
      try {
        await begin();
        const newUser = await Users(req.body);
        const userCreatedData = await newUser.save();
        res.send({ operationCompleted: true, userCreatedData });
      } catch (error) {
        res.send(error);
      } finally {
        await end();
      }
    });
    webAppModule.get(`${requestUrlPrefix}/users`, async (req, res) => {
      try {
        await begin();
        const usersDocuments = await Users.find();
        res.send({ users: usersDocuments });
      } catch (error) {
        res.send(error);
      } finally {
        await end();
      }
    });
    webAppModule.post(`${requestUrlPrefix}/todos`, async (req, res) => {
      try {
        await begin();
        const newTodo = new Todos(req.body);
        const todoCreatedData = await newTodo.save();
        res.send({ operationCompleted: true, todoCreatedData });
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
    webAppModule.delete(`${requestUrlPrefix}/todos`, async (req, res) => {
      try {
        await begin();
        const todosDocument = await Todos.deleteOne(req.body);
        res.send({ operationCompleted: true, todoDeletedData: todosDocument });
      } catch (error) {
        res.send(error);
      } finally {
        await end();
      }
    });
    webAppModule.put(`${requestUrlPrefix}/todos`, async (req, res) => {
      try {
        await begin();
        const todosDocument = await Todos.updateOne(
          { _id: req.body._id },
          req.body.updatedData,
        );
        res.send({ operationCompleted: true, todoDeletedData: todosDocument });
      } catch (error) {
        res.send(error);
      } finally {
        await end();
      }
    });
  },
};
