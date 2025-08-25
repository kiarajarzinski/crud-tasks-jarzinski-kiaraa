//para importar los modelos User y Task 
import User from './users.models.js';
import Task from './tasks.models.js';

//relaciones entre los modelos
User.hasMany(Task, { 
    foreignKey: 'userId'});
    Task.belongsTo(User, {
        foreignKey: 'userId',
    });

    //exportar los modelos 
    export { User, Task};
