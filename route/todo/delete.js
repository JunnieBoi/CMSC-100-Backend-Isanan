const { Todo } = require('../../db');
const { definitions } = require('../../definitions');
const { SuccessResponse, GetOneTodoParams } = definitions;


exports.deleteOne = app => {
    app.delete('/todo/:id', {
      schema: {
        description: 'Delete one todo',
        tags: ['Todo'],
        summary: 'Delete one todo',
        params: GetOneTodoParams,
        response: {
          200: SuccessResponse
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
  
      
      handler: async (request, response) => {
        const { params } = request;
        const { id } = params;
  
        const data = await Todo.findOneAndDelete({ id }).exec();
  
        if (!data) {
          return response
          .notFound('todo/not-found')
        }
  
        return {
          success: true
        };
      }
    });
  };
  