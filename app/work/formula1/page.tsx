import CategoryPageClient from "@/components/CategoryPageClient";

export const metadata = { title: "Formula 1 — Meework Studio" };

const items = [
  { title: "Brazilian GP — Max P17→P1", tag: "Formula 1", sub: "Red Bull", image: "/works/formula1-brazilian-gp---max-p17-p1.png" },
  { title: "Brazilian GP — Verstappen", tag: "Formula 1", sub: "Red Bull", image: "/works/formula1-brazilian-gp---verstappen.png" },
  { title: "Brazilian GP — Leclerc", tag: "Formula 1", sub: "Ferrari", image: "/works/formula1-brazilian-gp---leclerc.png" },
  { title: "Brazilian GP — Leclerc Countdown", tag: "Formula 1", sub: "Ferrari", image: "/works/formula1-brazilian-gp---leclerc-countdown.png" },
  { title: "Leclerc — 50 Podiums", tag: "Formula 1", sub: "Mexico GP · Ferrari", image: "/works/formula1-leclerc---50-podiums.png" },
  { title: "Mexico GP — Leclerc P2", tag: "Formula 1", sub: "Ferrari", image: "/works/formula1-mexico-gp---leclerc-p2.png" },
  { title: "Abu Dhabi GP — Leclerc P5", tag: "Formula 1", sub: "Ferrari", image: "/works/formula1-abu-dhabi-gp---leclerc-p5.png" },
];

export default function Formula1Page() {
  return (
    <CategoryPageClient
      category="Formula 1"
      number="02"
      description="Race day visuals, grand prix posters, driver profiles, and constructor season graphics."
      instagramHref="https://www.instagram.com/meeworkofficial/"
      items={items}
    />
  );
}
