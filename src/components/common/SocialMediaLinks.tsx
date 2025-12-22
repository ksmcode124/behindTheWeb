import { SocialMediaLink } from '@/components/ui/SocialMediaLink';
import { SocialMedia } from '@/lib/data';

interface Props {
  className?: string;
}

const ICON_STYLE =
  'h-12 w-12 text-2xl bg-primary-600 text-secondary-300 shadow-[4px_4px_0px_#393C45]';

export default function SocialMediaLinks({ className }: Props) {
  return (
    <div
      className={`border-primary-500 flex max-w-[300px] min-w-full -skew-3 flex-wrap items-center gap-3 gap-x-4 border-t-3 pt-3 sm:max-w-[360px] sm:gap-4 sm:pt-4 md:max-w-[420px] ${className}`}
    >
      {SocialMedia.map((social) => (
        <SocialMediaLink
          key={social.platform}
          platform={social.platform}
          href={social.href}
          iconClassName={ICON_STYLE}
        />
      ))}
    </div>
  );
}
