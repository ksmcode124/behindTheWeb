import { SocialMediaLink } from "./components/SocialMediaLink";

const socialMediaList = [
  { platform: "instagram", href: "https://www.instagram.com/the.code124" },
  { platform: "linkedin", href: "https://www.linkedin.com/..." },
  { platform: "whatsapp", href: "https://wa.me/..." },
  { platform: "email", href: "mailto:test@example.com" },
] as const;

export default function BehindTheWeb() {
  return (
    <>
    <div className="min-h-screen bg-black text-white p-8">
      <div className="flex flex-col gap-8">
        {socialMediaList.map((social) => (
          <SocialMediaLink
            key={social.platform}
            platform={social.platform}
            href={social.href}
            label="label text"
            className="w-[25px] h-[25px]"
            withBorder
          />
        ))}
      </div>
    </div>
    </>
  );
}
