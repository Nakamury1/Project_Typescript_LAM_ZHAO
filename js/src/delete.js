"use strict";
async;
deleteTask(id, number);
Promise < void  > {
    try: {
        const: task = await prisma.task.findUnique({ where: { id } }),
        if(task) { }
    } && !task.status
};
{
    await prisma.task.delete({ where: { id } });
    await this.displayTasks();
}
{
    alert('Les tâches validées ne peuvent pas être supprimées');
}
try { }
catch (error) {
    console.error('Erreur lors de la suppression de la tâche:', error);
    alert('Erreur lors de la suppression de la tâche');
}
