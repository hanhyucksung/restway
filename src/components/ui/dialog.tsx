import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import {X} from 'lucide-react'
import {cn} from '@/lib/utils'
const Dialog=DialogPrimitive.Root
const DialogTrigger=DialogPrimitive.Trigger
function DialogContent({className,children,...props}:React.ComponentProps<typeof DialogPrimitive.Content>){return <DialogPrimitive.Portal><DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/40"/><DialogPrimitive.Content className={cn('fixed bottom-0 left-1/2 z-50 max-h-[90dvh] w-full max-w-[520px] -translate-x-1/2 overflow-y-auto rounded-t-2xl border bg-background p-6 shadow-xl sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 sm:rounded-xl',className)} {...props}>{children}<DialogPrimitive.Close className="absolute right-4 top-4 rounded-md p-1 text-muted-foreground hover:bg-secondary" aria-label="닫기"><X className="size-5"/></DialogPrimitive.Close></DialogPrimitive.Content></DialogPrimitive.Portal>}
function DialogHeader({className,...props}:React.ComponentProps<'div'>){return <div className={cn('mb-6 flex flex-col gap-2 text-left',className)} {...props}/>}
const DialogTitle=DialogPrimitive.Title
const DialogDescription=DialogPrimitive.Description
export {Dialog,DialogTrigger,DialogContent,DialogHeader,DialogTitle,DialogDescription}
