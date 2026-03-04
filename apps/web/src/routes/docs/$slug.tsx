import { createFileRoute, redirect } from '@tanstack/react-router'
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/shadcn";
import "@blocknote/shadcn/style.css";
import { useMemo } from 'react';
import { useUser } from '@/hooks/use-user';
import * as Y from "yjs";
import YPartyKitProvider from "y-partykit/provider";

interface DocData {
  id: string;
  title: string;
  created: number;
  created_by: string;
}

export const Route = createFileRoute('/docs/$slug')({
  loader: async ({ params }: { params: { slug: string } }) => {
    const res = await fetch(`/api/docs/${params.slug}`);
    if (!res.ok) {
      throw redirect({ to: '/' });
    }
    return (await res.json()) as DocData;
  },
  component: RouteComponent,
})

const getRandomColor = () => {
  const colors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff", "#ffa500", "#800080", "#008080"];
  return colors[Math.floor(Math.random() * colors.length)];
};

function RouteComponent() {
  const docData = Route.useLoaderData();
  const { name } = useUser();
  const color = useMemo(() => getRandomColor(), []);

  const { doc, provider } = useMemo(() => {
    const doc = new Y.Doc();
    const provider = new YPartyKitProvider(
      "localhost:1999",
      docData.id,
      doc,
    );
    return { doc, provider };
  }, [docData.id]);

  const editor = useCreateBlockNote({
    collaboration: {
      provider,
      fragment: doc.getXmlFragment("document-store"),
      user: {
        name,
        color,
      }
    }
  });

  return (
    <div className='p-20 w-full h-screen relative'>
      <div className="absolute top-4 left-20 z-10">
        <h1 className="text-2xl font-bold text-gray-800">{docData.title}</h1>
      </div>
      <BlockNoteView
        className='h-full'
        editor={editor}
        theme="light"
      />
    </div>
  )
}
