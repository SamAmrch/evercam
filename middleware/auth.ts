import { useSupabaseUser } from "#imports";
import { defineNuxtRouteMiddleware, useRouter } from "#app";

export default defineNuxtRouteMiddleware(() => {
  const user = useSupabaseUser();
  const router = useRouter();

  // If user is not logged in, redirect to /login
  if (!user.value) {
    return router.push("/login");
  }
});
