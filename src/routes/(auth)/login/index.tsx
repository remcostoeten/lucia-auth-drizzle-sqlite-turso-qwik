import { component$ } from "@builder.io/qwik";
import { Form, Link, routeAction$, routeLoader$, z, zod$ } from "@builder.io/qwik-city";
import { eq } from "drizzle-orm";
import { verifyPassword } from "qwik-lucia";
import { AppleIcon, GithubIcon, GoogleIcon, LogoIcon } from "~/components/icons";
import { SocialButton } from "~/components/ui/social-buttons";
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

export const useLoginAction = routeAction$(
  async (values, event) => {
    const authRequest = handleRequest(event);

    try {
      const [user] = await db
        .select({
          id: userTable.id,
          username: userTable.username,
          passwordHash: userTable.passwordHash,
        })
        .from(userTable)
        .where(eq(userTable.username, values.username));

      if (!user) {
        return event.fail(400, {
          message: "Incorrect username or password",
        });
      }

      const isValidPassword = await verifyPassword(
        user.passwordHash,
        values.password,
      );

      if (!isValidPassword) {
        return event.fail(400, {
          message: "Incorrect username or password",
        });
      }

      const session = await lucia.createSession(user.id, {});
      authRequest.setSession(session);
    } catch (e) {
      console.error(e);
      return event.fail(500, {
        message: "An unknown error occurred",
      });
    }

    throw event.redirect(303, "/");
  },
  zod$({
    username: z.string(),
    password: z.string(),
  }),
);

export default component$(() => {
  const loginAction = useLoginAction();

  return (
    <>
      <div class="flex flex-col items-center text-center mb-8">
        <LogoIcon />
        <h2 class="mt-4 text-3xl font-bold">Log in to Raycast</h2>
      </div>

      <div class="space-y-4">
        <SocialButton
          icon={AppleIcon}
          text="Continue with Apple"
          provider="Apple"
          onClick$={() => console.log("Apple login clicked")}
        />
        <SocialButton
          icon={GithubIcon}
          text="Continue with GitHub"
          provider="GitHub"
          onClick$={() => console.log("GitHub login clicked")}
        />
        <SocialButton
          icon={GoogleIcon}
          text="Continue with Google"
          provider="Google"
          onClick$={() => console.log("Google login clicked")}
        />
      </div>

      <div class="mt-6 text-center text-sm text-text-gray">
        or
      </div>

      <Form action={loginAction} class="mt-6 space-y-4">
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
          Log In
        </button>
      </Form>

      {loginAction.value?.message && (
        <p class="mt-4 text-center font-bold text-[#FF6363]">{loginAction.value.message}</p>
      )}

      <div class="mt-6 text-center">
        <Link href="/register" class="text-[#FF6363] hover:underline">
          Don't have an account? Sign up
        </Link>
      </div>
    </>
  );
});

export const head = {
  title: "Login to Stoeten's panel",
  meta: [
    {
      name: "description",
      content: "Login to Stoeten's panel",
    },
  ],
};
