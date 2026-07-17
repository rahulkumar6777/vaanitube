import { Plan } from "../models/plans.model.js";

const getPlan = async (req, res) => {
    try {
        const planId = req.params.id;
        const plan = await Plan.findOne({ id: planId }).lean();

        if (!plan) {
            return res.status(404).json({ message: "Plan not found" });
        }

        return res.status(200).json({ plan });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export { getPlan };