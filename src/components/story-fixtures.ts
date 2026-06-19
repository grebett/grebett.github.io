import type { CollectionEntry } from "astro:content";

type EntryData = Omit<CollectionEntry<"entries">["data"], "date"> & {
  date: string | Date;
};

const makeEntry = (
  slug: string,
  data: EntryData,
): CollectionEntry<"entries"> =>
  (({
    id: slug,
    collection: "entries",
    data,
    body: "",
  }) as unknown) as CollectionEntry<"entries">;

export const archiveNoteEntry = makeEntry("archive-note-001", {
  id: "FRG-001",
  title: "Archive note 001",
  date: "2026-02-14",
  type: "archive",
  medium: ["texte", "scan"],
  tags: ["archive", "mémoire", "papier"],
  excerpt:
    "Un fragment d'archive annoté, posé entre relevé de terrain et fiction documentaire.",
  status: "public",
  related: [],
});

export const signalEntry = makeEntry("signal-17", {
  id: "SIG-017",
  title: "Signal 17",
  date: "2026-04-02",
  type: "audio",
  medium: ["audio", "texte"],
  tags: ["signal", "écoute", "nuit"],
  excerpt:
    "Une écoute brève, rythmée par un souffle électrique et quelques marques lumineuses.",
  audio: "/audio/signal-17.mp3",
  status: "public",
  related: [],
});

export const roomEntry = makeEntry("room-under-road", {
  id: "RUR-003",
  title: "Room under road",
  date: "2026-05-19",
  type: "fiction",
  medium: ["image", "texte"],
  tags: ["lieu", "souterrain", "fiction"],
  excerpt:
    "Plan partiel d'une pièce basse, traversée par la rumeur régulière d'une route.",
  cover: "/images/room-under-road.svg",
  status: "public",
  related: [],
});

export const stackTarget = "hidden-amber-signal";

export const stackArchiveEntry = makeEntry("archive-note-001", {
  ...archiveNoteEntry.data,
  stack: {
    id: "amber-signal",
    target: stackTarget,
    required: ["archive-note-001", "signal-17", "room-under-road"],
  },
});

export const stackSignalEntry = makeEntry("signal-17", {
  ...signalEntry.data,
  stack: {
    id: "amber-signal",
    target: stackTarget,
    required: ["archive-note-001", "signal-17", "room-under-road"],
  },
});

export const stackRoomEntry = makeEntry("room-under-road", {
  ...roomEntry.data,
  stack: {
    id: "amber-signal",
    target: stackTarget,
    required: ["archive-note-001", "signal-17", "room-under-road"],
  },
});

export const entries = [archiveNoteEntry, signalEntry, roomEntry];
export const stackEntries = [stackArchiveEntry, stackSignalEntry, stackRoomEntry];
