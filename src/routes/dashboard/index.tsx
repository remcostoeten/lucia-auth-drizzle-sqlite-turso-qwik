import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { handleRequest } from "~/lib/lucia";
import Header from "~/components/layout/header";
import Sidebar from "~/components/layout/sidebar";


  
const AIAssistant = component$(() => {
  return (
    <div class="fixed bottom-4 right-4 bg-[#1C1C1C] p-4 rounded-md w-64 ">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center">
           <svg class="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#FF6363"/>
            <path d="M8 12L11 15L16 10" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span class="font-bold text-white">EZQL</span>
        </div>
        <button class="text-[#898989] hover:text-white">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      <p class="text-sm text-[#898989] mb-4">I am EZQL, your personal database assistant. How can I help you?</p>
      <div class="space-y-2">
        <button class="w-full bg-[#323232] text-white px-3 py-2 rounded-md text-sm text-left">Generate an insightful query</button>
        <button class="w-full bg-[#323232] text-white px-3 py-2 rounded-md text-sm text-left">Detect anomalies across my tables</button>
        <button class="w-full bg-[#323232] text-white px-3 py-2 rounded-md text-sm text-left">Create a chart from my data</button>
      </div>
      <div class="mt-4 flex">
        <input type="text" placeholder="Message EZQL..." class="flex-1 bg-[#323232] text-white px-3 py-2 rounded-l-md text-sm" />
        <button class="bg-[#FF6363] text-white px-3 py-2 rounded-r-md">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </button>
      </div>
    </div>
  );
});

export const useDashboardLoader = routeLoader$(async (event) => {
  const authRequest = handleRequest(event);
  const { user } = await authRequest.validateUser();
  if (!user) {
    throw event.redirect(303, "/login");
  }
  return { user };
});

export default component$(() => {
  const dashboardLoader = useDashboardLoader();
  const user = dashboardLoader.value.user;

  return (
    <div class="min-h-screen bg-[#090909] text-white flex">
      <Sidebar />
      <div class="flex-1 flex flex-col">
        <Header />
        <main class="flex-1 p-8 border-t border-l border-border">
          <h1 class="text-3xl font-bold mb-4">That's one small step for man...</h1>
          <p class="text-[#898989] mb-8">Your giant leap is moments away. Let us show you the basics first by completing the steps below.</p>

          <div class="space-y-4">
            <div class="bg-[#1C1C1C] p-4 rounded-md">
              <div class="flex items-center">
                <svg class="w-6 h-6 text-[#21C55D] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Connect your database</span>
              </div>
            </div>
            <div class="bg-[#1C1C1C] p-4 rounded-md">
              <div class="flex items-center">
                <svg class="w-6 h-6 text-[#21C55D] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Create a table</span>
              </div>
            </div>
            <div class="bg-[#1C1C1C] p-4 rounded-md">
              <div class="flex items-center">
                <svg class="w-6 h-6 text-[#898989] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                <span>Explore the table experience</span>
              </div>
              <p class="mt-2 text-sm text-[#898989]">View, interact and edit your data with the same ease as working with a spreadsheet.</p>
              <button class="mt-4 bg-[#323232] text-white px-4 py-2 rounded-md text-sm">Start Tour</button>
            </div>
            <div class="bg-[#1C1C1C] p-4 rounded-md">
              <div class="flex items-center">
                <svg class="w-6 h-6 text-[#898989] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                <span>Ask your database a question</span>
              </div>
            </div>
            <div class="bg-[#1C1C1C] p-4 rounded-md">
              <div class="flex items-center">
                <svg class="w-6 h-6 text-[#898989] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                <span>Create a dashboard</span>
              </div>
            </div>
          </div>

          <button class="mt-8 bg-[#323232] text-white px-4 py-2 rounded-md text-sm">Skip tour</button>
        </main>
      </div>
      <AIAssistant />
    </div>
  );
});
