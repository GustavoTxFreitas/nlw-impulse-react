import { FeedbackType, feedbackTypes } from '..'
import { CloseButton } from '../../CloseButton'

interface FeedbackTypeStepProps {
    onFeedbackTypeChange: (type: FeedbackType) => void
}

export function FeedbackTypeStep({ onFeedbackTypeChange }: FeedbackTypeStepProps) {
    return (
        <>
            <header>
                <span className='text-xl'>Deixe seu feedback</span>
                <CloseButton />
            </header>

            <div className='flex py-8 gap-2 w-full'>
                {
                    Object.entries(feedbackTypes).map(([key, value]) => {
                        return (
                            <button
                                className='bg-zinc-800 rounded-lg py-5 w-24 flex flex-1 flex-col gap-2 items-center border-2 border-transparent hover:border-brand-500 focus:border-brand-500 focus:outline-none'
                                onClick={() => onFeedbackTypeChange(key as FeedbackType)}
                                type='button'
                                key={key}
                            >
                                <img src={value.image.source} alt={value.image.alt} />
                                <span>{value.title}</span>
                            </button>
                        )
                    })
                }
            </div>
        </>
    )
}