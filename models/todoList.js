const Todo = require('./todo');

class ToDoList {

    _list = {};

    get listArray(){
        const list = [];

        Object.keys(this._list).forEach( key => {
            const todo = this._list[key];
            list.push(todo);
        });

        return list;
    }

    constructor(){
        this._list = {};
    }

    loadArray( todoList = []){
        todoList.forEach( todo => {
            this._list[todo.id] = todo;
        });
    }

    createTodo(desc = ''){
        const todo = new Todo(desc);
        this._list[todo.id] = todo;
    }

    toggleTodo( ids = []){
        ids.forEach( id => {
            const todo = this._list[id];
            if( !todo.completedAt ){
                todo.completedAt = new Date().toISOString();
            }
        });

        this.listArray.forEach( todo => {
            if( !ids.includes(todo.id)){
                this._list[todo.id].completedAt = null;
            }
        })
    };

    deleteTodo( id = '' ){
        if (this._list[id]){
            delete this._list[id];
        }
    }

    fullList(){
        this.listArray.forEach( (todo, idx) => {
            let idxItem = '';
            let statusItem = '';
            if(todo.completedAt){
                idxItem = `${idx+1}.`.green;
                statusItem = `Completada`.green
            }else{
                idxItem = `${idx+1}.`.red;
                statusItem = `Pendiente`.red
            }

            const todoText = `${idxItem}. ${todo.desc} :: ${statusItem}`;
            console.log(todoText);
        });
    }

    statusList( status ){
        let index = 1;
        let idxItem = '';
        let statusItem = '';
        let todoText = '';
        this.listArray.forEach( todo => {
            if(status == 'c'){
                if(todo.completedAt){
                    idxItem = `${index.toString()}.`.green;;
                    statusItem = `Completada - ${todo.completedAt}`.green;
                    todoText = `${idxItem} ${todo.desc} :: ${statusItem}`;
                    console.log(todoText);
                    index += 1;
                }
            }else if(status == 'p'){
                if(!todo.completedAt){
                    idxItem = `${index}.`.red;;
                    statusItem = `Pendiente`.red;
                    todoText = `${idxItem} ${todo.desc} :: ${statusItem}`;
                    console.log(todoText);
                    index += 1;
                }
            }
        });
    }
}

module.exports = ToDoList;