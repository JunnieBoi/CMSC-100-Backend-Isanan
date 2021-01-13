const { Todo } = require('../../db');
const { definitions } = require('../../definitions');
const { GetOneTodoResponse, GetOneTodoParams } = definitions;




exports.get = (app) =>
{
    app.get('/todo/:id',{
    
        schema: {
            description: 'Get one todo',
            tags: ['Todo'],
            summary: 'Get one todo',
            params: GetOneTodoParams,
            response: {
              200: GetOneTodoResponse
            },
            security: [
              {
                bearer: []
              }
            ]
      
          },
          preHandler: app.auth([
            app.verifyJWT
          ]),
      
    
    handler:async (request,response) =>
    {
        const {params,user} = request;
        const { username } = user;
        const {id} = params;
        const data = await Todo.findOne({ id, username }).exec();
        if(!data)
        {
            return response
            .notFound('todo/not-found')
        }
        return{
            success:true,
            data
        };
        
    }
});
};