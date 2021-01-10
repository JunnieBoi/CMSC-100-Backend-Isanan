const {getTodos} = require('../../lib/get-todos');
const {join} = require('path');



exports.get = (app) =>
{
    app.get('/todo/:id',(request,response) =>
    {
        const {params} = request;
        const {id} = params;
        const filename = join(__dirname, '../../database.json');
        const encoding = 'utf8';
        const todos = getTodos(filename,encoding);
        const index = todos.findIndex(todo => todo.id === id);
        if(index < 0)
        {
            return response
                .code(404)
                .send({
                    success: false,
                    code: 'todo/not-found',
                    message: 'Todo doesn\'t exist'
                });
        }
        const data = todos[index];
        return{
            success:true,
            data
        };
        
    });
};