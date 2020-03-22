import { Resolver, Mutation, Args, Query, Authorized, Ctx, FieldResolver, Root, ResolverInterface, Arg } from "type-graphql";
import { Service } from "typedi";
import { Task } from "../../entities/Task";
import { TaskStatus, Difficulty, PersonalityTraitEnum, UserType } from "../../entities/enums";
import { Context } from "../types";
import { UserTaskStatus } from "../../entities/UserTaskStatus";
import { GraphQLError } from "graphql";
import { TaskInput } from "../inputs";
import { Translation, Checkpoint, User, UserTypeTask } from "../../entities";
import { UserCheckpointStatus } from "../../entities/UserCheckpointStatus";
import { PersonalityTaskTrait } from "../../entities/PersonalityTaskTrait";
import { In } from 'typeorm';

@Service()
@Resolver(() => Task)
export class TaskResolver {
    constructor() { }

    @Query(() => [Task])
    async tasks(@Arg("types", () => [UserType], { nullable: true }) types: UserType[], @Arg("traits", () => [PersonalityTraitEnum], { nullable: true }) traits: PersonalityTraitEnum[]) {
        const taskIds = [];
        let filter = types !== undefined || traits !== undefined;

        if (types) {
            const ids = (await UserTypeTask.find({ where: { userType: In(types) } })).map(t => t.taskId);
            taskIds.push(...ids);
        }

        if (traits) {
            const ids = (await PersonalityTaskTrait.find({ where: { personalityTrait: In(traits) } })).map(t => t.taskId);
            taskIds.push(...ids);
        }

        const tasks = await Task.find({ relations: ['checkpoints'], where: filter ? { id: In(taskIds) } : undefined });
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
        const healthTip = Translation.create(data.healhTip);
        await healthTip.save();
        task.title = title;
        task.amount = data.amount;
        task.description = description;
        task.difficulty = data.difficulty;
        task.cover = data.cover;
        task.healhTip = healthTip;
        const taskDb = await task.save();
        taskDb.checkpoints = await Promise.all(data.checkpoints.map(async checkpoint => {
            Object.assign(checkpoint, { task: taskDb });
            const title = Translation.create(checkpoint.title);
            await title.save();
            const description = Translation.create(checkpoint.description);
            await description.save();
            checkpoint.title = title;
            checkpoint.description = description;
            return Checkpoint.create(checkpoint).save();
        }));
        return taskDb;
    }

    @Authorized()
    @Mutation(() => String)
    async removeTask(@Arg('taskId') taskId: string) {
        const exists = await Task.findOne(taskId);
        if (exists) {
            await UserTaskStatus.delete({ taskId });
            const checkpoints = (await Checkpoint.find({ where: { taskId }})).map(c => c.id);
            await Promise.all(checkpoints.map(async checkpointId => UserCheckpointStatus.delete({ checkpointId })));
            await Checkpoint.delete({ taskId });
            await PersonalityTaskTrait.delete({ taskId });
            await UserTypeTask.delete({ taskId });
            await Task.delete({ id: taskId })
            // TODO: Remove traits && user types
            return "Ok";
        }

        throw new GraphQLError("Not found");
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

    async savePersonalityTraits(
      traits: PersonalityTraitEnum[],
      taskId: string
    ): Promise<Task> {
      const personalityTraits = await PersonalityTaskTrait.find({
        where: { taskId }
      });
      const personalityTraitsToRemove = personalityTraits.filter(
        trait => !traits.includes(trait.personalityTrait)
      );
      await PersonalityTaskTrait.remove(personalityTraitsToRemove);
      const promises = traits.map(async trait => {
        if (!personalityTraits.map(p => p.personalityTrait).includes(trait)) {
          const personalityTrait = new PersonalityTaskTrait();
          personalityTrait.taskId = taskId;
          personalityTrait.personalityTrait = trait;
          return personalityTrait.save();
        }
        return Promise.resolve();
      });
      await Promise.all(promises);
      return await Task.findOne(taskId) as Task;
    }
  

    @Authorized()
    @Mutation(() => Task)
    async setTaskPersonalityTraits(
        @Arg("traits", () => [PersonalityTraitEnum]) traits: PersonalityTraitEnum[],
        @Arg('taskId') taskId: string
    ) {
        return this.savePersonalityTraits(traits, taskId);
    }

    async saveUserTypes(
        types: UserType[],
        taskId: string
      ): Promise<Task> {
        const userTypes = await UserTypeTask.find({
          where: { taskId }
        });
        const userTypesToRemove = userTypes.filter(
          type => !types.includes(type.userType)
        );
        await UserTypeTask.remove(userTypesToRemove);
        const promises = types.map(async type => {
          if (!userTypes.map(t => t.userType).includes(type)) {
            const userType = new UserTypeTask();
            userType.taskId = taskId;
            userType.userType = type;
            return userType.save();
          }
          return Promise.resolve();
        });
        await Promise.all(promises);
        return await Task.findOne(taskId) as Task;
      }
    
  
      @Authorized()
      @Mutation(() => Task)
      async setTaskUserTypes(
          @Arg("types", () => [UserType]) types: UserType[],
          @Arg('taskId') taskId: string
      ) {
          return this.saveUserTypes(types, taskId);
      }

      @FieldResolver(() => [PersonalityTraitEnum])
      async personalityTraits(@Root() task: Task) {
          const personalityTraits = await PersonalityTaskTrait.find({
          where: { taskId: task.id }
          });
          return personalityTraits.map(p => p.personalityTrait);
      }
  
      @FieldResolver(() => [UserType])
      async types(@Root() task: Task) {
          const userTypes = await UserTypeTask.find({
          where: { taskId: task.id }
          });
          return userTypes.map(t => t.userType);
      }
}