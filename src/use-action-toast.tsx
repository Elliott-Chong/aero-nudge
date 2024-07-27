import { InfoCircledIcon } from '@radix-ui/react-icons'
import React from 'react'
import { toast } from 'sonner'

type Props = {
    description?: string
    onAction: () => Promise<void>
    onReset?: () => void
    isLoading: boolean
    show: boolean
}

const useActionToast = ({ onAction, onReset, isLoading, show, description }: Props) => {
    const toastId = React.useRef<string | number>()

    React.useEffect(() => {
        const renderToastContent = (isLoading: boolean) => {
            const ToastContent = () => {
                return (
                    <div className='mx-auto flex py-2 w-fit min-w-[400px] text-white items-center rounded-full bg-gradient-to-b from-gray-700 to-gray-900 pl-4 pr-3 shadow-xl shadow-black/30'>
                        <InfoCircledIcon className='size-4 mr-1' />
                        <div className="flex flex-col">
                            <span className='text-base ml-2'>Unsaved Changes</span>
                            {description && <span className='text-xs text-gray-400 ml-2'>{description}</span>}
                        </div>
                        <div className="ml-auto flex items-center gap-2 text-sm">
                            {onReset && (
                                <button
                                    className='bg-red-500 transition-all text-white px-4 py-1.5 rounded-full drop-shadow-xl disabled:opacity-60'
                                    onClick={() => {
                                        onReset()
                                        toast.dismiss(toastId.current)
                                    }}
                                    disabled={isLoading}
                                >
                                    Reset
                                </button>
                            )}
                            <button
                                className='transition-all bg-green-500 text-white px-4 py-1.5 rounded-full drop-shadow-xl disabled:opacity-60'
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

export default useActionToast