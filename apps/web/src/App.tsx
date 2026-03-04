import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { TooltipProvider } from "./components/ui/tooltip";
import { UserProvider } from "./hooks/use-user";


const router = createRouter({
  routeTree,
})


export default function App() {
  return (
    <UserProvider>
      <TooltipProvider>
        <RouterProvider router={router} />
      </TooltipProvider>
    </UserProvider>
  )
}
