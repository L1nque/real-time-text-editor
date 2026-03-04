import { FileIcon, FolderIcon, ForwardIcon, HomeIcon, MoreHorizontalIcon, PlusIcon, SearchIcon, Trash2Icon } from "lucide-react";
import { NavUser } from "./nav-user";
import { useUser } from "../hooks/use-user";
import { uniqueNamesGenerator, adjectives, animals, colors } from 'unique-names-generator';


import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "./ui/breadcrumb";
import { Separator } from "./ui/separator";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarInput, SidebarInset, SidebarMenu, SidebarMenuAction, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function AppShell({ children }: { children?: React.ReactNode; }) {
  return (
    <SidebarProvider style={
      {
        "--sidebar-width": "200px",
      } as React.CSSProperties
    }>
      <AppSidebar />
      <main className="min-h-screen w-full">
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">components test</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">ui</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>button.tsx</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          {children}
        </SidebarInset>
      </main>
    </SidebarProvider>
  )
}

const projects = [
  {
    name: "Design Engineering",
    url: "#",
  },
  {
    name: "Sales & Marketing",
    url: "#",
  },
  {
    name: "Travel",
    url: "#",
  },
]

function AppSidebar() {
  const user = useUser();
  const name = uniqueNamesGenerator({
    dictionaries: [adjectives, animals, colors],
    length: 2,
    separator: '-',
    style: 'capital',
  });

  return (
    <Sidebar>
      <SidebarHeader>
        <NavUser user={user} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="">
          <SidebarGroupContent className="relative">
            <SidebarInput
              id="search"
              placeholder="Type to search..."
              className="pl-8"
            />
            <SearchIcon className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none" />
          </SidebarGroupContent>
        </SidebarGroup>        <SidebarGroup>
          <SidebarGroupLabel>
            Platform
          </SidebarGroupLabel>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip={'home'} asChild>
              <a>
                <HomeIcon />
                Home
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Dialog>
              <DialogTrigger asChild>
                <SidebarMenuButton tooltip={"create"}>
                  <PlusIcon />
                  Create
                </SidebarMenuButton>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    Create a new document
                  </DialogTitle>
                  <DialogDescription>
                    Please go easy on me.
                  </DialogDescription>
                </DialogHeader>
                <Input placeholder={name} />
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant={'secondary'}>
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button>
                    Create
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </SidebarMenuItem>
        </SidebarGroup>
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel>Documents</SidebarGroupLabel>
          <SidebarMenu>
            {projects.map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton asChild>
                  <a href={item.url}>
                    <FileIcon />
                    <span>{item.name}</span>
                  </a>
                </SidebarMenuButton>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuAction showOnHover>
                      <MoreHorizontalIcon />
                      <span className="sr-only">More</span>
                    </SidebarMenuAction>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-48 rounded-lg"
                    side={"right"}
                    align={"start"}
                  >
                    <DropdownMenuItem>
                      <FolderIcon className="text-muted-foreground" />
                      <span>View Project</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <ForwardIcon className="text-muted-foreground" />
                      <span>Share Project</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Trash2Icon className="text-muted-foreground" />
                      <span>Delete Project</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
