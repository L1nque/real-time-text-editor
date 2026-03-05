import { createFileRoute, redirect } from '@tanstack/react-router'
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/shadcn";
import "@blocknote/shadcn/style.css";
import { useState, useEffect } from 'react';
import { useUser } from '@/hooks/use-user';
import * as Y from "yjs";
import YPartyKitProvider from "y-partykit/provider";
import { IndexeddbPersistence } from 'y-indexeddb';

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
  const colors = [
    "#a5b4fc",
    "#93c5fd",
    "#7dd3fc",
    "#67e8f9",
    "#5eead4",
    "#6ee7b7",
    "#86efac",
    "#bef264",
    "#fde047",
    "#fcd34d",
    "#fdba74",
    "#fca5a5",
    "#fda4af",
    "#fbcfe8",
    "#f5d0fe",
    "#d8b4fe",
    "#c4b5fd",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

function RouteComponent() {
  const { slug } = Route.useParams();
  const docData = Route.useLoaderData();
  const { name } = useUser();
  const color = useState(() => getRandomColor())[0];

  const [collab, setCollab] = useState<{
    doc: Y.Doc;
    provider: YPartyKitProvider;
    room: string;
  } | null>(null);

  useEffect(() => {
    const doc = new Y.Doc();
    const provider = new YPartyKitProvider(
      "localhost:1999",
      slug,
      doc,
    );
    const persistence = new IndexeddbPersistence(slug, doc);

    setCollab({ doc, provider, room: slug });

    return () => {
      provider.destroy();
      persistence.destroy();
      doc.destroy();
      setCollab(null);
    };
  }, [slug]);

  if (!collab || collab.room !== slug) {
    return null; // Ensure we don't render the old room's data while transitioning
  }

  return (
    <Editor
      key={slug}
      doc={collab.doc}
      provider={collab.provider}
      name={name}
      color={color}
      title={docData.title}
    />
  );
}

function Editor({
  doc,
  provider,
  name,
  color,
  title,
}: {
  doc: Y.Doc;
  provider: YPartyKitProvider;
  name: string;
  color: string;
  title: string;
}) {
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
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
      </div>
      <BlockNoteView
        className='h-full'
        editor={editor}
        theme="light"
      />
    </div>
  );
}
