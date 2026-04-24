import CategoryPageClient from "@/components/CategoryPageClient";

export const metadata = { title: "Cars — Meework Studio" };

const items = [
  { title: "McLaren W1 — The Real Supercar", tag: "Cars", sub: "McLaren", image: "/works/cars-mclaren-w1---the-real-supercar.png" },
  { title: "Porsche Macan 4 Electric", tag: "Cars", sub: "Porsche", image: "/works/cars-porsche-macan-4-electric.png" },
];

export default function CarsPage() {
  return (
    <CategoryPageClient
      category="Cars"
      number="03"
      description="Automotive editorial, supercar showcases, and JDM street photography — visual storytelling for machines."
      instagramHref="https://www.instagram.com/meeworkofficial/"
      items={items}
    />
  );
}
