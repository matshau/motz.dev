import { communityPranks } from "../../data/pranks";
import PrankDetail from "./PrankDetail";

export function generateStaticParams() {
  return communityPranks.map((p) => ({ id: p.id }));
}

export default function Page() {
  return <PrankDetail />;
}
