import CategoryPageClient from "@/components/CategoryPageClient";

export const metadata = { title: "Football — Meework Studio" };

const items = [
  { title: "Manchester Derby", tag: "Premier League", sub: "Man Utd vs Man City", image: "/works/football-manchester-derby.png" },
  { title: "Liverpool v Arsenal", tag: "Premier League", sub: "Premier League", image: "/works/football-liverpool-v-arsenal.png" },
  { title: "Arsenal v Forest", tag: "Premier League", sub: "Arsenal vs Nottingham Forest", image: "/works/football-arsenal-v-forest.png" },
  { title: "Chelsea v Brentford", tag: "Premier League", sub: "Premier League", image: "/works/football-chelsea-v-brentford.png" },
  { title: "El Clásico", tag: "La Liga", sub: "Real Madrid vs Barcelona", image: "/works/football-el-cl-sico.png" },
];

export default function FootballPage() {
  return (
    <CategoryPageClient
      category="Football"
      number="01"
      description="Match graphics, derby posters, league content, and matchday visuals crafted for the energy of the game."
      instagramHref="https://www.instagram.com/meeworkofficial/"
      items={items}
    />
  );
}
