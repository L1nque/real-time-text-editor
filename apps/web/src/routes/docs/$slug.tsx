import { createFileRoute } from '@tanstack/react-router'
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/shadcn";
import "@blocknote/shadcn/style.css";

export const Route = createFileRoute('/docs/$slug')({
  component: RouteComponent,
})

function RouteComponent() {
  const editor = useCreateBlockNote();

  return (
    <div className='p-20 w-full h-screen relative'>
      <BlockNoteView
        className='h-full'
        editor={editor}
        theme="light"
      />
    </div>
  )
}
