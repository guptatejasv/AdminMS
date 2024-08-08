// scheduler.js
import cron from "node-cron";
import deleteExpiredDiscounts from "./deleteExpiredDiscounts";

cron.schedule(
  "0 0 * * *",
  () => {
    console.log("Running deleteExpiredDiscounts task...");
    deleteExpiredDiscounts();
  },
  {
    scheduled: true,
    timezone: "Asia/Kolkata",
  }
);

console.log("Scheduler started");
