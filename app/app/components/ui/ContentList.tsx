type Content = {
  date: string;
  title: string;
  category: string;
  href: string;
};

type Props = {
  data: Content[]
};

export function ContentList({ data }: Props) {
  return (
      <div className="max-h-full m-auto mb-10 text-sm">
        <header className="font-mono text-gray-500 dark:text-gray-600 flex items-center text-xs">
          {/* TODO: それぞれに、ソート機能を実装する */}
          <button className="w-16 h-9 text-left">date</button>
          <span className="grow pl-4">title</span>
          <button className="h-9 pl-4">category</button>
        </header>
        <ul className="desktop:max-h-96 laptop:max-h-72 tablet:max-h-48 max-h-72 overflow-y-auto border-t border-gray-200 dark:border-[#313131] scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-100">
          {data.map(({ href, date, title, category }, index) => (
            <li key={index}>
              <a href={href}>
                <span
                  className={`flex transition-[background-color] hover:bg-gray-300 dark:hover:bg-[#242424] active:bg-gray-200 dark:active:bg-[#222] border-b border-gray-200 dark:border-[#313131] ${
                    index === data.length - 1 ? "border-b-0" : ""
                  }`}
                >
                  <span className="py-3 flex grow items-center">
                    {data && (
                      <span className="w-16 inline-block self-start shrink-0 text-gray-500 dark:text-gray-500">
                        {date}
                      </span>
                    )}
                    <span className="grow pl-4 dark:text-gray-100">{title}</span>
                    <span className="text-gray-500 dark:text-gray-500 text-xs">
                      {category}
                    </span>
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
  );
}
