import { razorpay } from "./razorpay.js";

export const createRazorpayOrder = async ({ amount, receipt, notes }) => {
    try {
        const order = await razorpay.orders.create({
            amount: amount,
            currency: "INR",
            receipt: receipt,
            notes: notes
        });
        return order;
    } catch (error) {
        console.error("Error creating order:", error);
        throw error;
    }
};
