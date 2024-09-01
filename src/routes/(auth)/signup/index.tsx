import { component$ } from "@builder.io/qwik";
import { routeLoader$, routeAction$, zod$, z, Form, Link, Link } from "@builder.io/qwik-city";
import { LogoIcon, GithubIcon, GoogleIcon, AppleIcon } from "~/components/icons";
import { LibsqlError } from "@libsql/client";
import { hashPassword } from "qwik-lucia";
import { db } from "~/lib/db";
import { handleRequest, lucia } from "~/lib/lucia";
import { userTable } from "~/lib/schema";

export const useUserLoader = routeLoader$(async (event) => {
  const authRequest = handleRequest(event);
  const { session } = await authRequest.validateUser();
  if (session) {
    throw event.redirect(303, "/");
  }
  return {};
});

export const useSignupUser = routeAction$(
  async (values, event) => {
    const authRequest = handleRequest(event);
    try {
      const existingUser = await db
        .select({ id: userTable.id })
        .from(userTable)
        .where(eq(userTable.username, values.username))
        .get();

      if (existingUser) {
        return event.fail(400, {
          message: "Username already taken",
        });
      }

      const passwordHash = await hashPassword(values.password);
      const [user] = await db
        .insert(userTable)
        .values({
          passwordHash,
          username: values.username,
        })
        .returning({
          id: userTable.id,
        });

      const session = await lucia.createSession(user.id, {});
      authRequest.setSession(session);
    } catch (e) {
      if (e instanceof LibsqlError && e.code === "SQLITE_CONSTRAINT") {
        return event.fail(400, {
          message: "Username already taken",
        });
      }
      return event.fail(500, {
        message: "An unknown error occurred",
      });
    }

    throw event.redirect(303, "/");
  },
  zod$({
    username: z.string().min(2),
    password: z.string().min(5),
  })
);

export default component$(() => {
  const signupUserAction = useSignupUser();

  return (
    <>
      <div class="flex flex-col items-center text-center mb-8">
        <LogoIcon />
        <h2 class="mt-4 text-3xl font-bold">Sign up for Raycast</h2>
      </div>

      <div class="space-y-4">
        <button class="w-full bg-btn-bg text-white py-3 rounded-md hover:bg-bg-active flex items-center justify-center space-x-2">
          <AppleIcon />
          <span>Continue with Apple</span>
        </button>
        <button class="w-full bg-btn-bg text-white py-3 rounded-md hover:bg-bg-active flex items-center justify-center space-x-2">
          <GithubIcon />
          <span>Continue with GitHub</span>
        </button>
        <button class="w-full bg-btn-bg text-white py-3 rounded-md hover:bg-bg-active flex items-center justify-center space-x-2">
          <GoogleIcon />
          <span>Continue with Google</span>
        </button>
      </div>

      <div class="mt-6 text-center text-sm text-text-gray">
        or
      </div>

      <Form action={signupUserAction} class="mt-6 space-y-4">
        <div>
          <label for="username" class="block text-sm font-medium text-text-gray">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            required
            class="mt-1 block w-full bg-transparent border border-border text-white px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6363]"
          />
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-text-gray">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            class="mt-1 block w-full bg-transparent border border-border text-white px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6363]"
          />
        </div>
        <button type="submit" class="w-full bg-[#FF6363] text-white py-3 rounded-md hover:bg-[#FF4F4F] transition duration-300">
          Sign Up
        </button>
      </Form>

      {signupUserAction.value?.message && (
        <p class="mt-4 text-center font-bold text-[#FF6363]">{signupUserAction.value.message}</p>
      )}

      <div class="mt-6 text-center">
        <Link href="/login" class="text-[#FF6363] hover:underline">
          Already have an account? Log in
        </Link>
      </div>
    </>
  );
});

export const head = {
  title: "Register for Stoeten's panel",
  meta: [
    {
      name: "description",
      content: "Register for Stoeten's panel",
    },
  ],
};
