import Image from "next/image";
import {
  SiAnchor,
  SiTwitter,
  SiGithub,
  SiFacebook,
  SiInstagram,
} from "react-icons/si";
import { GoMail } from "react-icons/go";
import s from "../styles/index.module.css";

const ServiceItem = ({ i, item }) => {
  return (
    <>
      <a className={s.service} href={item.href} target="_blank" key={i}>
        {i === 0 && <GoMail size={28} color="black" />}
        {i === 1 && <SiGithub size={28} color="black" />}
        {i === 2 && <SiTwitter size={28} color="#1DA1F2" />}
        {i === 3 && <SiFacebook size={28} color="#1877F2" />}
        {i === 4 && (
          <>
            <img
              src="images/zenn.png"
              style={{ width: "28px", height: "28px" }}
            />
          </>
        )}
      </a>
    </>
  );
};

const Index = ({ links, profile }) => {
  const { introText } = profile;
  return (
    <>
      <div className={s.topScreen}>
        <div className={s.nameCard}>
          <div className="flex items-center">
            <div className="tablet:p-2 laptop:p-3">
              <Image
                className="block p-2 mx-auto h-24 laptop:h-36 rounded-full laptop:mx-0 flex-shrink-0"
                src="/images/takewell_face.jpg"
                alt="takewell 画像"
                width={50 * 2}
                height={50 * 2}
              />
            </div>
            <div className="p-2 tablet:p-2 laptop:p-3">
              <p className="text-3xl laptop:text-6xl tablet:text-3xl text-black font-semibold">
                @takewell
              </p>
              <p className="pl-2 laptop:text-2xl tablet:text-xl text-gray-400 font-semibold">
                yuya takei
              </p>
            </div>
          </div>
          <div className="p-3 tablet:p-2 laptop:p-3">
            {/* <p className="py-3 text-2xl tablet:text-xl laptop:text-3xl font-semibold">
              Software Engineer
            </p> */}
            <p className="py-2 text-base leading-7 tablet:text-sm laptop:text-lg font-semibold whitespace-pre-wrap">
              {introText}
            </p>
          </div>
        </div>
      </div>
      <nav className={s.serviceItem}>
        <div className={s.serviceContainer}>
          {links.map((item, i) => (
            <ServiceItem i={i} item={item} key={i} />
          ))}
        </div>
      </nav>
    </>
  );
};

Index.getInitialProps = async () => {
  const key = {
    headers: { "X-API-KEY": process.env.MICROCMS_API_KAY },
  };
  const links = [
    {
      href: "mailto:takewell.dev@gmail.com",
    },
    {
      href: "https://github.com/takewell",
    },
    {
      href: "https://twitter.com/takewell_",
    },
    {
      href: "https://www.facebook.com/profile.php?id=100009877623537",
    },
    {
      href: "https://zenn.dev/takewell",
    },
  ];
  const data = await fetch("https://takewell.microcms.io/api/v1/profile", key)
    .then((res) => res.json())
    .catch(() => null);
  return {
    profile: data,
    links,
  };
};

export default Index;
