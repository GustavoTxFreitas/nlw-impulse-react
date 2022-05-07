import { useState } from 'react'

import bugImageUrl from '../../assets/bug.svg'
import ideaImageUrl from '../../assets/idea.svg'
import toughtImageUrl from '../../assets/thought.svg'

import { FeedbackTypeStep } from './Steps/FeedbackTypeStep'
import { FeedbackContentStep } from './Steps/FeedbackContentStep'
import { FeedbackSuccessStep } from './Steps/FeedbackSuccessStep'

export const feedbackTypes = {
    BUG: {
        title: 'Problema',
        image: {
            source: bugImageUrl,
            alt: 'Imagem de um inseto'
        }
    },
    IDEA: {
        title: 'Ideia',
        image: {
            source: ideaImageUrl,
            alt: 'Imagem de uma lâmpada'
        }
    },
    OTHER: {
        title: 'Outro',
        image: {
            source: toughtImageUrl,
            alt: 'Imagem de um balão de pensamento'
        }
    }
}

export type FeedbackType = keyof typeof feedbackTypes

export function WidgetForm() {
    const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null)
    const [feedbackSent, setFeedbackSent] = useState(false)

    function handleFeedbackDrop() {
        setFeedbackSent(false)
        setFeedbackType(null)
    }

    function handleFeedbackSend() {
        setFeedbackSent(true)
    }

    return (
        <div className='bg-zinc-900 relative rounded-2xl w-[calc(100vw-2rem)] md:w-auto mb-4 p-4 flex flex-col items-center shadow-lg'>
            {feedbackSent === false
                ? <>
                    {
                        feedbackType === null
                            ? <FeedbackTypeStep onFeedbackTypeChange={setFeedbackType} />
                            : <FeedbackContentStep
                                feedbackType={feedbackType}
                                dropFeedback={handleFeedbackDrop}
                                sendFeedback={handleFeedbackSend} />
                    }
                </>
                : <FeedbackSuccessStep
                    dropFeedback={handleFeedbackDrop} />
            }

            <footer className='text-xs text-neutral-400'>
                Feito com &#9829; pela <a href='https://rocketseat.com.br/' className='underline underline-offset-2'>Rocketseat</a>
            </footer>
        </div>
    )
}