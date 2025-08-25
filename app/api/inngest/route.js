
import { serve } from "inngest/next";
import { inngest, syncUserCreation, syncUserUpdation, syncUserDeletion } from "@/config/inngest";


export const {GET , POST, DELETE} =  serve({
  client: inngest,
  functions: [
   syncUserCreation,
   syncUserUpdation,
   syncUserDeletion
  ],
});