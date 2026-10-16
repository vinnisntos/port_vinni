import { useId } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

/**
 * Campo do site: label acima, input de vidro (shadcn), ícone opcional à
 * esquerda e erro abaixo, ligado ao input por aria-describedby.
 */
export default function Field({ label, error, icon, className = '', wrapperClassName = '', id, ...props }) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const errorId = `${inputId}-error`;

  return (
    <div className={cn('grid w-full gap-2', wrapperClassName)}>
      {label && (
        <Label htmlFor={inputId} className="text-muted-foreground">
          {label}
        </Label>
      )}
      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-muted-foreground">
            {icon}
          </span>
        )}
        <Input
          id={inputId}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={cn(icon && 'pl-11', className)}
          {...props}
        />
      </div>
      {error && (
        <p id={errorId} role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
