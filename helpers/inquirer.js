const inquirer = require('inquirer');
require('colors');

const questions = [
    {
        type: 'list',
        name: 'option',
        message: '¿Qué desea hacer?',
        choices: [{
            value: '1',
            name: `${'1'.magenta}. Crear tarea`
        }, {
            value: '2',
            name: `${'2'.magenta}. Listar tareas`
        }, {
            value: '3',
            name: `${'3'.magenta}. Listar tareas completadas`
        }, {
            value: '4',
            name: `${'4'.magenta}. Listar tareas pendientes`
        }, {
            value: '5',
            name: `${'5'.magenta}. Completar tarea(s)`
        }, {
            value: '6',
            name: `${'6'.magenta}. Borrar tarea`
        }, {
            value: '0',
            name: `${'0'.magenta}. Salir`
        }]
    }
]

const inquirerMenu = async() => {
    //console.clear();
    console.log('======================='.magenta);
    console.log('Seleccione una opción:'.white);
    console.log('=======================\n'.magenta);

    const { option } = await inquirer.prompt(questions);

    return option;
}

const pause = async() => {
    
    const question = [{
            type: 'input',
            name: 'enter',
            message: `Presione ${'ENTER'.magenta} para continuar...`
        }];
    
    console.log('\n');
    await inquirer.prompt(question);
}

const readInput = async( message ) => {
    const question = [{
        type: 'input',
        name: 'desc',
        message,
        validate (value) {
            if(value.length === 0){
                return 'Por favor ingrese un valor';
            }
            return true;
        }
    }];

    const { desc } = await inquirer.prompt(question);
    return desc;
}

const completeTodoList = async ( todoList = [] ) => {
    
    const choices = todoList.map( (todo, idx) => {
        
        const idxItem = `${(idx+1).toString()}.`.magenta;
        
        return {
            value: todo.id,
            name: `${idxItem} ${todo.desc}`,
            checked: (todo.completedAt) ? true : false
        }
    });

    const questions = [{
        type: 'checkbox',
        name: 'ids',
        message: 'Selecciones',
        choices
    }];

    const { ids } = await inquirer.prompt(questions);
    return ids;
}


const deleteTodoList = async ( todoList = [] ) => {
    
    const choices = todoList.map( (todo, idx) => {
        
        const idxItem = `${(idx+1).toString()}.`.magenta;
        
        return {
            value: todo.id,
            name: `${idxItem} ${todo.desc}`
        }
    });

    choices.push({
        value: '0',
        name: `${'0. '.magenta} Cancelar`
    });

    const questions = [{
        type: 'list',
        name: 'id',
        message: 'Borrar',
        choices
    }];

    const { id } = await inquirer.prompt(questions);
    return id;
}

const deleteTodoConfirm = async (message) => {
    const question = [{
        type: 'confirm',
        name: 'ok',
        message
    }];

    const { ok } = await inquirer.prompt(question);
    return ok;
}

module.exports = { 
    inquirerMenu, pause, readInput, completeTodoList, deleteTodoList, deleteTodoConfirm
}