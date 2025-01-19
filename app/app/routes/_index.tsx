import type { MetaFunction } from "@remix-run/cloudflare";
import { ContentList } from "@/components/ui/ContentList";
import { IconLink } from "@/components/ui/IconLink";
import { useLoaderData } from "@remix-run/react";
import { getPages } from "@/lib/getContents";
import { SITE } from "@/constants/site";
import styles from "./index.module.css";

type Content = {
  title: string;
  href: string;
  date: string;
  category: string;
};

export const meta: MetaFunction = () => {
  return [
    { title: SITE.title },
    { name: "description", content: SITE.description },
  ];
};

export const loader = async () => {
  try {
    const contents = await getPages();
    return contents.map(({ title, slug, date, category }) => ({
      title,
      href: slug,
      date: date.replace(/-/g, "."),
      category,
    }));
  } catch (error) {
    console.error("Error in loader:", error);
    throw new Response("Failed to load contents", { status: 500 });
  }
};

const resources = [
  { name: "mail", href: SITE.email },
  { name: "x", href: SITE.x },
  { name: "facebook", href: "https://www.facebook.com/profile.php?id=100009877623537" },
  { name: "github", href: SITE.github },
  { name: "zenn", href: "https://zenn.dev/takewell" },
  { name: "speakerdeck", href: "https://speakerdeck.com/takewell" },
] as const;

export default function Index() {
  const data = useLoaderData<Content[]>();

  return (
    <div className={styles.topScreen}>
      <div className={styles.card}>
        <div className="flex items-center">
          <div className="tablet:p-2 laptop:p-3">
            <img
              className="laptop:h-16 laptop:w-16 w-12 h-12 rounded-full"
              src="/takei.jpg"
              alt="yuya takei avatar"
            />
          </div>
          <div className="p-1 tablet:p-1 laptop:p-2">
            <p className="text-2xl laptop:text-4xl tablet:text-3xl text-black font-semibold">
              @takewell
            </p>
            <p className="pl-2 laptop:text-2xl tablet:text-xl text-gray-400 font-semibold">
              yuya takei
            </p>
          </div>
        </div>
        <div className="tablet:p-2 laptop:p-3">
          <ContentList data={data} />
        </div>
      </div>
      <nav className={styles.serviceItem}>
        <div className={styles.serviceContainer}>
          {resources.map(({ href, name }, index) => (
            <IconLink name={name} href={href} key={index} />
          ))}
        </div>
      </nav>
    </div>
  );
}
