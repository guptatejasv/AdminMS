// deleteExpiredDiscounts.js
import { Discount } from "../models/admin.Discount";
import moment from "moment";

const deleteExpiredDiscounts = async () => {
  const now = moment().toDate();
  try {
    const result = await Discount.deleteMany({ endDate: { $lt: now } });
    console.log(`${result.deletedCount} expired discounts deleted.`);
  } catch (err) {
    console.error("Error deleting expired discounts:", err);
  }
};

export default deleteExpiredDiscounts;
