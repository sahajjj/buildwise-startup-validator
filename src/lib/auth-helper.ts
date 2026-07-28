import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

export async function getSessionUser() {
  let userObj: { id: string; email: string; name: string; imageUrl?: string } | null = null;

  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
    const cookieStore = await cookies();
    const sandboxName = cookieStore.get("sandbox_user_name")?.value || "Alex Co-founder";
    const sandboxEmail = cookieStore.get("sandbox_user_email")?.value || "founder@buildwise.ai";
    const userId = "mock-" + sandboxEmail.replace(/[^a-zA-Z0-9]/g, "-");

    userObj = {
      id: userId,
      email: sandboxEmail,
      name: sandboxName,
      imageUrl: `https://avatar.vercel.sh/${userId}`,
    };
  } else {
    try {
      const user = await currentUser();
      if (user) {
        userObj = {
          id: user.id,
          email: user.emailAddresses[0]?.emailAddress || "",
          name: `${user.firstName || ""} ${user.lastName || ""}`.trim() || "Founder",
          imageUrl: user.imageUrl,
        };
      }
    } catch (error) {
      console.error("Clerk auth failed, using mock session:", error);
      const cookieStore = await cookies();
      const sandboxName = cookieStore.get("sandbox_user_name")?.value || "Alex Co-founder";
      const sandboxEmail = cookieStore.get("sandbox_user_email")?.value || "founder@buildwise.ai";
      const userId = "mock-" + sandboxEmail.replace(/[^a-zA-Z0-9]/g, "-");

      userObj = {
        id: userId,
        email: sandboxEmail,
        name: sandboxName,
        imageUrl: `https://avatar.vercel.sh/${userId}`,
      };
    }
  }

  // Auto-upsert user in the database so that foreign keys are satisfied
  if (userObj) {
    try {
      const existingUser = await prisma.user.findUnique({
        where: { email: userObj.email },
      });

      if (existingUser) {
        userObj.id = existingUser.id;
        await prisma.user.update({
          where: { id: existingUser.id },
          data: { name: userObj.name },
        });
      } else {
        try {
          await prisma.user.create({
            data: { id: userObj.id, name: userObj.name, email: userObj.email },
          });
        } catch (createError: any) {
          if (createError.code === "P2002") {
            const doubleCheckedUser = await prisma.user.findUnique({
              where: { email: userObj.email },
            });
            if (doubleCheckedUser) {
              userObj.id = doubleCheckedUser.id;
            }
          } else {
            throw createError;
          }
        }
      }
    } catch (e) {
      console.warn("Failed to auto-upsert user in DB:", e);
    }
  }

  return userObj;
}
export default getSessionUser;
