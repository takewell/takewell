import Image from 'next/image'
import {
  // SiAnchor,
  SiTwitter,
  SiGithub,
  SiFacebook,
} from 'react-icons/si'
import { GoMail } from 'react-icons/go'
// import s from '../styles/index.module.css'

const LINKS = [
  {
    href: 'mailto:takewell.dev@gmail.com',
  },
  {
    href: 'https://github.com/takewell',
  },
  {
    href: 'https://twitter.com/takewell_',
  },
  {
    href: 'https://www.facebook.com/profile.php?id=100009877623537',
  },
  {
    href: 'https://zenn.dev/takewell',
  },
] as const

type Profile = {
  introText: string
}

const ServiceItem = ({
  i,
  item,
}: {
  i: number
  item: typeof LINKS[number]
}) => {
  return (
    <>
      <a href={item.href} target="_blank" key={i}>
        {i === 0 && <GoMail size={28} color="black" />}
        {i === 1 && <SiGithub size={28} color="black" />}
        {i === 2 && <SiTwitter size={28} color="#1DA1F2" />}
        {i === 3 && <SiFacebook size={28} color="#1877F2" />}
        {i === 4 && (
          <>
            <img
              src="images/zenn.png"
              style={{ width: '28px', height: '28px' }}
            />
          </>
        )}
      </a>
    </>
  )
}

const Index = ({ profile }: { profile: Profile }) => {
  const { introText } = profile

  return (
    <>
      <div>
        <div>
          <div className="flex items-center">
            <div className="tablet:p-2 laptop:p-3">
              <Image
                className="block p-2 mx-auto h-24 laptop:h-36 rounded-full laptop:mx-0 flex-shrink-0"
                src="/images/takewell_face.jpg"
                alt="takewell 画像"
                width={100}
                height={100}
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
            <p className="py-3 text-2xl tablet:text-xl laptop:text-3xl font-semibold">
              Software Engineer
            </p>
            <p className="py-2 text-base leading-7 tablet:text-sm laptop:text-lg font-semibold whitespace-pre-wrap">
              {introText}
            </p>
          </div>
        </div>
      </div>
      <nav>
        <div>
          {LINKS.map((item, i) => (
            <ServiceItem i={i} item={item} key={i} />
          ))}
        </div>
      </nav>
    </>
  )
}

Index.getInitialProps = async () => {
  if (!process.env.MICROCMS_API_KAY) {
    console.warn('not set MICRbOCMS_API_KAY')
    return
  }

  const key = {
    headers: { 'X-API-KEY': process.env.MICROCMS_API_KAY },
  }
  const data = await fetch('https://takewell.microcms.io/api/v1/profile', key)
    .then((res) => res.json())
    .catch(() => null)
  return {
    profile: data,
  }
}

export default Index
