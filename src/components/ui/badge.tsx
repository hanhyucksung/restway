import * as React from 'react'
import {cn} from '@/lib/utils'
function Badge({className,variant='default',...props}:React.ComponentProps<'span'>&{variant?:'default'|'secondary'|'outline'}) {return <span data-slot="badge" className={cn('inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-medium',variant==='default'?'bg-primary text-primary-foreground':variant==='secondary'?'bg-secondary text-secondary-foreground':'border border-border text-foreground',className)} {...props}/>}
export {Badge}
