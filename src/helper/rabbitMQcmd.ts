/* eslint-disable @typescript-eslint/no-explicit-any */
import amqp from "amqplib";

const RABBITMQ_URI = "amqp://localhost";

export async function sendCommand(command: any) {
  try {
    const connection = await amqp.connect(RABBITMQ_URI);
    const channel = await connection.createChannel();
    const queue = "admin_commands";

    await channel.assertQueue(queue, { durable: false });
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(command)));
    console.log("Command sent:", command);

    setTimeout(() => {
      connection.close();
    }, 500);
  } catch (error) {
    console.error("Error in Admin microservice:", error);
  }
}
