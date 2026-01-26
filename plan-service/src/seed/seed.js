import { seedPlans } from "./plan.js";
import { Plan } from "../models/plans.model.js";

export const runSeed = async () => {
    const count = await Plan.countDocuments();
    if (count === 0) {
        await seedPlans();
    } else {
        console.log("Plans already seeded");
    }
}
