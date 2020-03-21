import { Resolver, Mutation, Args, Query, Authorized, Ctx, FieldResolver, Root, Arg } from "type-graphql";
import { Service } from "typedi";
import { Task } from "../../entities/Task";
import { TaskStatus, Difficulty, CheckpointStatus } from "../../entities/enums";
import { Context } from "../types";
import { UserTaskStatus } from "../../entities/UserTaskStatus";
import { GraphQLError } from "graphql";
import { Translation, Checkpoint } from "../../entities";
import { UserCheckpointStatus } from "../../entities/UserCheckpointStatus";

@Service()
@Resolver(() => Checkpoint)
export class CheckpointResolver {
    constructor() { }

    @Authorized()
    @Mutation(() => Checkpoint)
    async changeCheckpointStatus(@Ctx() context: Context, @Arg('checkpointId') checkpointId: string, @Arg('status', () => TaskStatus) status: CheckpointStatus) {
        const checkpoint = await Checkpoint.findOne(checkpointId);
        if (!checkpoint) {
            return new GraphQLError("Checkpoint doesn't exist");
        }

        let checkpointStatus = await UserCheckpointStatus.findOne({ where: { userId: context.user.id, checkpointId: checkpoint.id }})
        if (checkpointStatus) {
            checkpointStatus.status = status;
            await checkpointStatus.save();
            return checkpoint;
        }

        checkpointStatus = new UserCheckpointStatus();
        checkpointStatus.userId = context.user.id;
        checkpointStatus.checkpointId = checkpointId;
        checkpointStatus.status = status;
        await checkpointStatus.save();

        return checkpoint;
    }

    @FieldResolver(() => CheckpointStatus)
    async status(@Ctx() context: Context, @Root() checkpoint: Checkpoint) {
        console.log(checkpoint);
        if (!context?.user?.id) {
            return CheckpointStatus.ToDo;
        }
        const checkpointStatus = await UserCheckpointStatus.findOne({ where: { userId: context.user.id, checkpointId: checkpoint.id }});
        if (!checkpointStatus) {
            return CheckpointStatus.ToDo;
        }
        return checkpointStatus.status;
    }
}