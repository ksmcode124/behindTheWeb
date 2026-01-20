import { Spinner } from '@/components/ui/spinner';

export function Loading() {
  return (
    <div className="grid h-screen w-full items-center justify-items-center">
      <Spinner className="size-32 -translate-y-[100%]" />
    </div>
  );
}
