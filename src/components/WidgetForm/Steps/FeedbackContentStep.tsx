import { FormEvent, useState } from 'react'
import { ArrowLeft } from 'phosphor-react'

import { CloseButton } from '../../CloseButton'
import { FeedbackType, feedbackTypes } from '..'
import { ScreenshotButton } from '../../ScreenshotButton'
import { api } from '../../../libs/api'
import { Loading } from '../../Loading'

interface FeedbackContentStepProps {
    feedbackType: FeedbackType,
    dropFeedback: () => void,
    sendFeedback: () => void
}

export function FeedbackContentStep({ feedbackType, dropFeedback, sendFeedback }: FeedbackContentStepProps) {
    const [screenshotURL, setScreenshotURL] = useState<string | null>(null)
    const [isSendingFeedback, setIsSendingFeedback] = useState(false)
    const [comment, setComment] = useState('')

    const feedbackTypeInfo = feedbackTypes[feedbackType]

    async function handleSubmitFeedback(event: FormEvent) {
        event.preventDefault()

        if (isSendingFeedback) {
            return
        }

        setIsSendingFeedback(true)

        try {
            await api.post('/feedbacks', {
                type: feedbackType,
                screenshot: screenshotURL,
                comment
            })

            sendFeedback()
        } catch (error) {
            console.log(error)
            setIsSendingFeedback(false)
        }
    }

    return (
        <>
            <header>
                <button
                    className='top-5 left-5 absolute text-zinc-400 hover:text-zinc-100'
                    onClick={dropFeedback}
                    type='button'>
                    <ArrowLeft className='w-4 h-4' weight='bold' />
                </button>

                <span className='flex items-center gap-2 text-xl leading-6'>
                    <img src={feedbackTypeInfo.image.source} alt={feedbackTypeInfo.image.alt} />
                    {feedbackTypeInfo.title}
                </span>

                <CloseButton />
            </header>

            <form
                onSubmit={handleSubmitFeedback}
                className='w-full my-4'>

                <textarea
                    className='w-full min-w-[304px] min-h-[112px] text-sm placeholder-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-1 focus:ring-brand-500 focus:outline-none resize-none scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin'
                    placeholder='Conte-nos, com detalhes, o que está acontecendo...'
                    onChange={event => setComment(event.target.value)} />

                <footer className='flex gap-2'>
                    <ScreenshotButton
                        screenshot={screenshotURL}
                        onScreenshotTook={setScreenshotURL} />

                    <button
                        className='bg-brand-500 rounded-md p-2 border-transparent flex flex-1 justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500'
                        disabled={comment.length === 0 || isSendingFeedback}
                        type="submit">
                        {isSendingFeedback ? <Loading /> : 'Enviar Feedback'}
                    </button>
                </footer>
            </form>
        </>
    )
}