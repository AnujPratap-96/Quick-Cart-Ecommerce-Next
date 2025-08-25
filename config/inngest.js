import { Inngest } from "inngest";
import connectDB from "./db";
import User from "@/models/user.model";

export const inngest = new Inngest({ id: "quickcart-next" });

// Inngest Function to save user data to database

export const syncUserCreation = inngest.createFunction(
  {
    id: "sync-user-from-clerk",
  },
  {
    event: "clerk/user.created",
  },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;
    const userData = {
      _id: id,
      email: email_addresses[0]?.email_address || "",
      name: `${first_name} ${last_name}`.trim(),
      imageUrl: image_url,
    };
    await connectDB();
    await User.create(userData);
  }
);

// Inngest Function to Update User Data in Database

export const syncUserUpdation = inngest.createFunction(
    {
        id: 'update-from-clerk'
    },
    {
        event: 'clerk/user.updated'
    },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;
    const userData = {
      _id: id,
      email: email_addresses[0]?.email_address || "",
      name: `${first_name} ${last_name}`.trim(),
      imageUrl: image_url,
    };
    await connectDB();
    await User.findByIdAndUpdate(id, userData);
  }
);


// Inngest Function to Delete User Data in Database

export const syncUserDeletion = inngest.createFunction(
    { id : 'delete-user-from-clerk'},
    { event: 'clerk/user.deleted'},
    async ({ event }) => {
        const { id } = event.data;
        await connectDB();
        await User.findByIdAndDelete(id);
    }
)
