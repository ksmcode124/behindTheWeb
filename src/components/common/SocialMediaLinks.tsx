import { SOCIAL_MEDIA } from '@/lib/constants';
import { SocialMediaLink } from '../ui/SocialMediaLink';

const ICON_STYLE =
  'h-12 w-12 text-2xl bg-primary-600 text-secondary-300 shadow-[4px_4px_0px_#393C45]';

export default function SocialMediaLinks() {
  return (
    <div className="flex -rotate-3 flex-wrap items-center justify-center gap-x-4">
      {SOCIAL_MEDIA.map((social) => (
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
