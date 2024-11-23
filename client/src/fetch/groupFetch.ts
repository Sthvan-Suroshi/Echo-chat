import { CHAT_GROUP_URL } from "@/lib/apiEndPoints";

export async function fetchChatGroups(token: string) {
  const res = await fetch(CHAT_GROUP_URL, {
    headers: {
      Authorization: token,
    },
    next: {
      revalidate: 3600,
      tags: ["dashboard"],
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch groups");
  }
  const response = await res.json();

  if (response?.data) {
    return response.data;
  }

  return [];
}
