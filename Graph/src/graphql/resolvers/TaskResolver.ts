import { Resolver, Mutation, Args, Query, Authorized, Ctx, FieldResolver, Root, ResolverInterface, Arg } from "type-graphql";
import { Service } from "typedi";
import { Task } from "../../entities/Task";
import { TaskStatus, Difficulty } from "../../entities/enums";
import { Context } from "../types";
import { UserTaskStatus } from "../../entities/UserTaskStatus";
import { GraphQLError } from "graphql";
import { TaskInput } from "../inputs";
import { Translation, Checkpoint, User } from "../../entities";

@Service()
@Resolver(() => Task)
export class TaskResolver {
    constructor() { }

    @Query(() => [Task])
    async tasks() {
        const tasks = await Task.find({ relations: ['checkpoints'] });
        return tasks;
    }

    @Authorized()
    @Mutation(() => Task)
    async addTask(@Arg('data') data: TaskInput) {
        const task = new Task();
        const title = Translation.create(data.title);
        await title.save(); 
        const description = Translation.create(data.description);
        await description.save();
        task.title = title;
        task.amount = data.amount;
        task.description = description;
        task.difficulty = data.difficulty;
        const taskDb = await task.save();
        taskDb.checkpoints = await Promise.all(data.checkpoints.map(async checkpoint => {
            Object.assign(checkpoint, { task: taskDb });
            const title = Translation.create(data.title);
            await title.save();
            const description = Translation.create(data.description);
            await description.save();
            checkpoint.title = title;
            checkpoint.description = description;
            return Checkpoint.create(checkpoint).save();
        }));
        return taskDb;
    }

    async updateUserBalance(userId: string, amount: number) {
        const user = await User.findOne(userId);
        if (user) {
            user.balance += amount;
            user.save();
        }
    }

    @Authorized()
    @Mutation(() => Task)
    async changeTaskStatus(@Ctx() context: Context, @Arg('taskId') taskId: string, @Arg('status', () => TaskStatus) status: TaskStatus) {
        const task = await Task.findOne(taskId);
        if (!task) {
            return new GraphQLError("Task doesn't exist");
        }

        let taskStatus = await UserTaskStatus.findOne({ where: { userId: context.user.id, taskId: task.id }})
        
        if (status === TaskStatus.Done && task.amount > 0) {
            this.updateUserBalance(context.user.id, task.amount);
        }

        if (taskStatus) {
            taskStatus.status = status;
            await taskStatus.save();
            return task;
        }

        taskStatus = new UserTaskStatus();
        taskStatus.userId = context.user.id;
        taskStatus.taskId = taskId;
        taskStatus.status = status;
        await taskStatus.save();

        return task;
    }

    @FieldResolver(() => TaskStatus)
    async status(@Ctx() context: Context, @Root() task: Task) {
        if (!context?.user?.id) {
            return TaskStatus.ToDo;
        }
        const taskStatus = await UserTaskStatus.findOne({ where: { userId: context.user.id, taskId: task.id }});
        if (!taskStatus) {
            return TaskStatus.ToDo;
        }
        return taskStatus.status;
    }
}