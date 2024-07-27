import './styles.css'
import React from 'react'
import { toast } from 'sonner'

type Props = {
    description?: string
    onAction: () => any
    onReset?: () => any
    title?: string
    isLoading: boolean
    show: boolean
    className?: string
}

const useAeroNudge = ({ onAction, onReset, title = 'Unsaved Changes', isLoading, show, description, className }: Props) => {
    const toastId = React.useRef<string | number>()

    React.useEffect(() => {
        const renderToastContent = (isLoading: boolean) => {
            const ToastContent = () => {
                return (
                    <div className={`aero-nudge-container ${className}`}>
                        {/* <InfoCircledIcon className='size-4 mr-1' /> */}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className='aero-nudge-icon'>
                            <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                        </svg>

                        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '0.2rem' }}>
                            <span>{title}</span>
                            {description && <span style={{ fontSize: '0.75rem', color: '#a1a1aa', marginTop: '0.2rem' }}>{description}</span>}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', gap: '0.4rem', marginLeft: 'auto' }}>
                            {onReset && (
                                <button
                                    className='aero-nudge-reset aero-nudge-button'
                                    onClick={async () => {
                                        await onReset()
                                        toast.dismiss(toastId.current)
                                    }}
                                    disabled={isLoading}
                                >
                                    Reset
                                </button>
                            )}
                            <button
                                className='aero-nudge-action aero-nudge-button'
                                onClick={async () => {
                                    await onAction()
                                    toast.dismiss(toastId.current)
                                }}
                                disabled={isLoading}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                )
            }
            ToastContent.displayName = 'ToastContent'
            return ToastContent
        }

        if (show) {
            if (!toastId.current) {
                toastId.current = toast.custom(
                    renderToastContent(isLoading),
                    {
                        position: 'bottom-center',
                        duration: Infinity,
                        dismissible: false
                    }
                )
            } else {
                toast.custom(renderToastContent(isLoading), {
                    id: toastId.current,
                })
            }
        } else if (toastId.current) {
            toast.dismiss(toastId.current)
            toastId.current = undefined
        }
    }, [show, isLoading, onAction, onReset, description])
}

export default useAeroNudge