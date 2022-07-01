[![Nest Logo](http://kamilmysliwiec.com/public/nest-logo.png)](http://kamilmysliwiec.com/)

[Nest](https://github.com/kamilmysliwiec/nest) framework [CQRS module](https://github.com/kamilmysliwiec/nest-cqrs) usage example.

This project uses a custom RabbitMQ event bus for usage with the CQRS module.

## Setup

To run the project, be sure to spin up the necessary RabbitMQ container using:

````
docker-compose up -d
````

Once the RabbitMQ broker is running you can start the Nest service using:

```
$ npm install
$ npm start
```

To test the end-to-end flow of the commands, events and sagas, execute the following curl command

```
$ curl -X POST 'http://localhost:3000/project/install' \
-H 'Content-Type: application/json' \
-d '{
    "id": "93843jjhsd8u38bnd",
    "name": "Fiwoo",
    "component": "Fiwoo Backend",
    "tools": [
        "VSCode",
        "Nodejs",
        "Postman",
        "Cypress.io"
    ]
}'
```

if everything is setup correctly, you should see the following in the Nest logs:

```
[ProjectCommandHandler] - InstallProjectCommand... {"id":"93843jjhsd8u38bnd","name":"Fiwoo","component":"Fiwoo Backend","tools":["VSCode","Nodejs","Postman","Cypress.io"]}
[Publish RabbitMQ Message] {"id":"TOOL_INSTALLED_EVENT","projectName":"VSCode","environmentName":"Fiwoo"}
[Publish RabbitMQ Message] {"id":"TOOL_INSTALLED_EVENT","projectName":"Nodejs","environmentName":"Fiwoo"}
[Publish RabbitMQ Message] {"id":"TOOL_INSTALLED_EVENT","projectName":"Postman","environmentName":"Fiwoo"}
[Publish RabbitMQ Message] {"id":"TOOL_INSTALLED_EVENT","projectName":"Cypress.io","environmentName":"Fiwoo"}
[Listen RabbitMQ Message] {"id":"TOOL_INSTALLED_EVENT","projectName":"VSCode","environmentName":"Fiwoo"}
[Pass event to event handler] {"id":"TOOL_INSTALLED_EVENT","projectName":"VSCode","environmentName":"Fiwoo"}
[EventHandler] - Installed Tool: {"id":"TOOL_INSTALLED_EVENT","projectName":"VSCode","environmentName":"Fiwoo"}
[Listen RabbitMQ Message] {"id":"TOOL_INSTALLED_EVENT","projectName":"Nodejs","environmentName":"Fiwoo"}
[Pass event to event handler] {"id":"TOOL_INSTALLED_EVENT","projectName":"Nodejs","environmentName":"Fiwoo"}
[EventHandler] - Installed Tool: {"id":"TOOL_INSTALLED_EVENT","projectName":"Nodejs","environmentName":"Fiwoo"}
[Listen RabbitMQ Message] {"id":"TOOL_INSTALLED_EVENT","projectName":"Postman","environmentName":"Fiwoo"}
[Pass event to event handler] {"id":"TOOL_INSTALLED_EVENT","projectName":"Postman","environmentName":"Fiwoo"}
[EventHandler] - Installed Tool: {"id":"TOOL_INSTALLED_EVENT","projectName":"Postman","environmentName":"Fiwoo"}
[Listen RabbitMQ Message] {"id":"TOOL_INSTALLED_EVENT","projectName":"Cypress.io","environmentName":"Fiwoo"}
[Pass event to event handler] {"id":"TOOL_INSTALLED_EVENT","projectName":"Cypress.io","environmentName":"Fiwoo"}
[EventHandler] - Installed Tool: {"id":"TOOL_INSTALLED_EVENT","projectName":"Cypress.io","environmentName":"Fiwoo"}
```