require('colors');

const { saveDB, readDB } = require('./db/manager');
const { inquirerMenu, 
        pause, 
        readInput, 
        completeTodoList, 
        deleteTodoList, 
        deleteTodoConfirm } 
    = require('./helpers/inquirer');
const ToDo = require('./models/todo');
const ToDoList = require('./models/todoList');

const main = async() => {

    const todoList = new ToDoList();
    const todoListDB = readDB();
    let option = '';

    if(todoListDB){
        todoList.loadArray( todoListDB );
    }

    while(option !== '0') {

        option = await inquirerMenu();

        switch (option){
            case '1':
                const desc = await readInput('Descripción:');
                console.log(desc);
                todoList.createTodo(desc);
                break;
            case '2':
                todoList.fullList();
                break;
            case '3':
                todoList.statusList('c');
                break;
            case '4':
                todoList.statusList('p');
                break;
            case '5':
                const ids = await completeTodoList( todoList.listArray );
                todoList.toggleTodo( ids );
                break;
            case '6':
                const id = await deleteTodoList( todoList.listArray );
                if(id !== '0'){
                    const confirm = await deleteTodoConfirm('¿Seguro deseas borrar esta tarea?');
                    if(confirm){
                        todoList.deleteTodo(id);
                        console.log('Tarea borrada.');
                    }    
                }
                break;
            default:
                break;
        }

        saveDB( todoList.listArray );

        if(option !== '0') await pause();
    }
}



main();