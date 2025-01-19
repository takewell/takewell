import { SiFacebook, SiGithub, SiGmail, SiSpeakerdeck, SiX, SiZenn } from "react-icons/si";

type IconName = 'github' | 'facebook' | 'x' | 'mail' | 'zenn' | 'speakerdeck'

type Props = {
  href: string;
  name: IconName;
  className?: string;
};

export const IconLink = ({ href, name, className }: Props) => {
  const iconMap = {
    mail: SiGmail,
    github: SiGithub, 
    facebook: SiFacebook,
    x: SiX,
    zenn: SiZenn,
    speakerdeck: SiSpeakerdeck
  };

  const IconComponent = iconMap[name];

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`p-1 slate-400 hover:opacity-80 transition-opacity ${className || ""}`}
    >
      <IconComponent className="text-gray-500 w-6 h-6 laptop:h-10 laptop:w-10" />
    </a>
  );
};
