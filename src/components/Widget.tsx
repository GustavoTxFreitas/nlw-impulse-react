import { ChatTeardropDots } from 'phosphor-react'
import { Popover } from '@headlessui/react'
import { WidgetForm } from './WidgetForm'

export function Widget() {
    return (
        <Popover className='absolute bottom-6 right-6 flex flex-col items-end'>
            <Popover.Panel>
                <WidgetForm />
            </Popover.Panel>

            <Popover.Button className='group bg-brand-500 text-white flex items-center rounded-full px-3 h-12'>
                <ChatTeardropDots className='w-6 h-6' />
                <span className='overflow-hidden max-w-0 group-hover:max-w-xs transition-all duration-500 ease-linear'>
                    <span className="pl-1">Feedback</span>
                </span>
            </Popover.Button>
        </Popover>
    )
}