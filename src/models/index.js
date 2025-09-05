//para importar los modelos User y Task 
import User from './users.models.js';
import Task from './tasks.models.js';
import Profile from './profiles.models.js';
import Project from './projects.models.js';

//relaciones entre los modelos
User.hasMany(Task, { 
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});
    Task.belongsTo(User, {
        foreignKey: 'userId',
    });
    //relacion uno a uno entre User y Profile 
    User.hasOne(Profile, {
        foreignKey: 'userId',});
        Profile.belongsTo(User,{
            foreignKey: 'userId',
            onDelete: 'CASCADE'
        })

        //relacion entre User y Project
        User.belongsToMany(Project, {
            through: 'UserProjects',
            foreignKey: 'userId',
        });
        Project.belongsToMany(User, {
            through: 'UserProjects',
            foreignKey: 'projectId',
        });

    //exportar los modelos 
    export { User, Task, Profile, Project};
