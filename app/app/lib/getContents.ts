import { Client } from "@notionhq/client";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

type Page = {
  id: string;
  title: string;
  slug: string;
  date: string;
  category: string;
};

type TitleProperty = {
  type: "title";
  title: Array<{ plain_text: string }>;
};

type RichTextProperty = {
  type: "rich_text";
  rich_text: Array<{ plain_text: string }>;
};

type DateProperty = {
  type: "date";
  date: { start: string };
};

type NotionProperty = TitleProperty | RichTextProperty | DateProperty;

const getPropertyValue = (
  property: NotionProperty | undefined,
  type: NotionProperty["type"],
  defaultValue: string = ""
): string => {
  if (!property || property.type !== type) return defaultValue;

  switch (type) {
    case "title":
      return (property as TitleProperty).title?.[0]?.plain_text || defaultValue;
    case "rich_text":
      return (property as RichTextProperty).rich_text?.[0]?.plain_text || defaultValue;
    case "date":
      return (property as DateProperty).date?.start || defaultValue;
    default:
      return defaultValue;
  }
};

export async function getPages(): Promise<Page[]> {
  const databaseId = process.env.NOTION_DATABASE_ID;

  if (!databaseId) {
    throw new Error("Database ID is not set");
  }

  const response = await notion.databases
    .query({
      database_id: databaseId,
      filter: {
        property: "Published",
        checkbox: {
          equals: true,
        },
      },
      sorts: [
        {
          property: "Date",
          direction: "descending",
        },
      ],
    })
    .catch((error) => {
      console.error(error);
      throw new Error("Failed to fetch contents from Notion");
    });

  return response.results
    .filter((page): page is PageObjectResponse => "properties" in page)
    .map((page) => {
      const properties = page.properties;

      return {
        id: page.id,
        title: getPropertyValue(properties.Page as TitleProperty, "title", "Untitled"),
        slug: getPropertyValue(properties.Slug as RichTextProperty, "rich_text"),
        date: getPropertyValue(properties.Date as DateProperty, "date"),
        category: getPropertyValue(properties.Category as RichTextProperty, "rich_text"),
      };
    });
}
