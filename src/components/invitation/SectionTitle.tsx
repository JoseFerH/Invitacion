import { cn } from '@/lib/utils';

export function SectionTitle({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <h2 className={cn("text-5xl md:text-6xl font-great-vibes text-primary text-center mb-6", className)}>
      {children}
    </h2>
  );
}
