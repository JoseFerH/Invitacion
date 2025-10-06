import { cn } from '@/lib/utils';

export function SectionTitle({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <h2 className={cn("text-3xl md:text-4xl font-bold text-primary font-headline text-center mb-6", className)}>
      {children}
    </h2>
  );
}
