import { component$ } from "@builder.io/qwik";
import {
  type DocumentHead,
  routeAction$,
  zod$,
  z,
  Form,
  routeLoader$,
  Link,
} from "@builder.io/qwik-city";
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

      // create a session
      const session = await lucia.createSession(user.id, {});
      authRequest.setSession(session); // set session cookie
    } catch (e) {
      // check for unique constraint error in user table
      if (e instanceof LibsqlError && e.code === "SQLITE_CONSTRAINT") {
        return event.fail(400, {
          message: "Username already taken",
        });
      }
      return event.fail(500, {
        message: "An unknown error occurred",
      });
    }

    // redirect to
    // make sure you don't throw inside a try/catch block!
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
    <div class="min-h-screen bg-[#1C1C1E] text-white flex flex-col">
      {/* Header */}
      <header class="p-4 flex justify-between items-center">
        <div class="flex items-center space-x-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#FF6363"/>
            <path d="M8 12L11 15L16 10" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span class="font-bold text-xl">Raycast</span>
        </div>
        <nav class="hidden md:flex space-x-4">
          <a href="#" class="hover:text-gray-300">Store</a>
          <a href="#" class="hover:text-gray-300">Pro</a>
          <a href="#" class="hover:text-gray-300">Teams</a>
          <a href="#" class="hover:text-gray-300">Developers</a>
          <a href="#" class="hover:text-gray-300">Changelog</a>
          <a href="#" class="hover:text-gray-300">Blog</a>
          <a href="#" class="hover:text-gray-300">Pricing</a>
        </nav>
        <div class="flex items-center space-x-4">
          <Link href="/login" class="hover:text-gray-300">Log in</Link>
          <button class="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200">Download</button>
        </div>
      </header>

      {/* Main Content */}
      <main class="flex-grow flex items-center justify-center">
        <div class="w-full max-w-md">
          <div class="text-center mb-8">
            <svg class="mx-auto w-16 h-16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#FF6363"/>
              <path d="M8 12L11 15L16 10" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <h2 class="mt-4 text-3xl font-bold">Register for Raycast</h2>
          </div>

          <div class="space-y-4">
            <button class="w-full bg-[#2C2C2E] text-white py-3 rounded-md hover:bg-[#3A3A3C] flex items-center justify-center space-x-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0C5.373 0 0 5.373 0 12C0 18.627 5.373 24 12 24C18.627 24 24 18.627 24 12C24 5.373 18.627 0 12 0ZM12 2.25C17.385 2.25 21.75 6.615 21.75 12C21.75 17.385 17.385 21.75 12 21.75C6.615 21.75 2.25 17.385 2.25 12C2.25 6.615 6.615 2.25 12 2.25Z" fill="white"/>
                <path d="M9.75 18.75L18 12L9.75 5.25V18.75Z" fill="white"/>
              </svg>
              <span>Continue with Apple</span>
            </button>
            <button class="w-full bg-[#2C2C2E] text-white py-3 rounded-md hover:bg-[#3A3A3C] flex items-center justify-center space-x-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 0C5.37 0 0 5.37 0 12C0 17.31 3.435 21.795 8.205 23.385C8.805 23.49 9.03 23.13 9.03 22.815C9.03 22.53 9.015 21.585 9.015 20.58C6 21.135 5.22 19.845 4.98 19.17C4.845 18.825 4.26 17.76 3.75 17.475C3.33 17.25 2.73 16.695 3.735 16.68C4.68 16.665 5.355 17.55 5.58 17.91C6.66 19.725 8.385 19.215 9.075 18.9C9.18 18.12 9.495 17.595 9.84 17.295C7.17 16.995 4.38 15.96 4.38 11.37C4.38 10.065 4.845 8.985 5.61 8.145C5.49 7.845 5.07 6.615 5.73 4.965C5.73 4.965 6.735 4.65 9.03 6.195C9.99 5.925 11.01 5.79 12.03 5.79C13.05 5.79 14.07 5.925 15.03 6.195C17.325 4.635 18.33 4.965 18.33 4.965C18.99 6.615 18.57 7.845 18.45 8.145C19.215 8.985 19.68 10.05 19.68 11.37C19.68 15.975 16.875 16.995 14.205 17.295C14.64 17.67 15.015 18.39 15.015 19.515C15.015 21.12 15 22.41 15 22.815C15 23.13 15.225 23.505 15.825 23.385C18.2072 22.5807 20.2772 21.0497 21.7437 19.0074C23.2101 16.965 23.9993 14.5143 24 12C24 5.37 18.63 0 12 0Z" fill="white"/>
              </svg>
              <span>Continue with GitHub</span>
            </button>
            <button class="w-full bg-[#2C2C2E] text-white py-3 rounded-md hover:bg-[#3A3A3C] flex items-center justify-center space-x-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.8055 10.0415H21V10H12V14H17.6515C16.827 16.3285 14.6115 18 12 18C8.6865 18 6 15.3135 6 12C6 8.6865 8.6865 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C6.4775 2 2 6.4775 2 12C2 17.5225 6.4775 22 12 22C17.5225 22 22 17.5225 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z" fill="#FFC107"/>
                <path d="M3.15295 7.3455L6.43845 9.755C7.32745 7.554 9.48045 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C8.15895 2 4.82795 4.1685 3.15295 7.3455Z" fill="#FF3D00"/>
                <path d="M12 22C14.583 22 16.93 21.0115 18.7045 19.404L15.6095 16.785C14.5717 17.5742 13.3037 18.001 12 18C9.39903 18 7.19053 16.3415 6.35853 14.027L3.09753 16.5395C4.75253 19.778 8.11353 22 12 22Z" fill="#4CAF50"/>
                <path d="M21.8055 10.0415H21V10H12V14H17.6515C17.2571 15.1082 16.5467 16.0766 15.608 16.7855L15.6095 16.7845L18.7045 19.4035C18.4855 19.6025 22 17 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z" fill="#1976D2"/>
              </svg>
              <span>Continue with Google</span>
            </button>
          </div>

          <div class="mt-6 text-center text-sm text-gray-500">
            or
          </div>

          <Form action={signupUserAction} class="mt-6 space-y-4">
            <div>
              <label for="username" class="block text-sm font-medium text-gray-300">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                class="mt-1 block w-full bg-[#2C2C2E] text-white px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6363]"
              />
            </div>
            <div>
              <label for="password" class="block text-sm font-medium text-gray-300">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                class="mt-1 block w-full bg-[#2C2C2E] text-white px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6363]"
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
        </div>
      </main>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Signup Page",
  meta: [
    {
      name: "description",
      content: "This is the signup page",
    },
  ],
};
