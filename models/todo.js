const { v4: uuidv4 } = require('uuid');

class ToDo {
    id= '';
    desc = '';
    completedAt = null;

    constructor( desc ) {
        this.id = uuidv4();
        this.desc = desc;
        this.completedAt = null;
    }
}

module.exports = ToDo;