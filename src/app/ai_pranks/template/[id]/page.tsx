import { templates } from "../../data/templates";
import TemplateDetail from "./TemplateDetail";

export function generateStaticParams() {
  return templates.map((t) => ({ id: t.id }));
}

export default function Page() {
  return <TemplateDetail />;
}
