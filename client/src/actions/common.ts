"use server";

import { revalidatePath } from "next/cache";

export const clearCache = async (tag: string) => {
  if (tag === "dashboard") {
    revalidatePath("/dashboard"); // Correct path
  }
};
