import React from 'react'
import { toast } from 'sonner'
import styled from 'styled-components'

type Props = {
    description?: string
    onAction: () => any
    onReset?: () => any
    title?: string
    isLoading: boolean
    show: boolean
    className?: string
}

const NudgeContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  display: flex;
  padding: 0.6rem 0.75rem 0.6rem 1rem;
  width: fit-content;
  min-width: 400px;
  color: white;
  align-items: center;
  border-radius: 9999px;
  background-image: linear-gradient(to bottom, #374151, #111827);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3),
    0 8px 10px -6px rgba(0, 0, 0, 0.3);
`

const NudgeIcon = styled.svg`
  width: 1.2rem;
  height: 1.2rem;
  margin-right: 0.5rem;
`

const NudgeButton = styled.button`
  transition: all 0.2s ease-in-out;
  text-align: center;
  color: white;
  padding: 0.5rem 0.9rem;
  border: none;
  outline: none;
  background: none;
  font-family: inherit;
  font-size: 0.875rem;
  cursor: pointer;
  border-radius: 9999px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3),
    0 8px 10px -6px rgba(0, 0, 0, 0.3);
`

const ResetButton = styled(NudgeButton)`
  background-color: #ef4444;
`

const ActionButton = styled(NudgeButton)`
  background-color: #22c55e;
`

const useAeroNudge = ({ onAction, onReset, title = 'Unsaved Changes', isLoading, show, description, className }: Props) => {
    const toastId = React.useRef<string | number>()

    React.useEffect(() => {
        const renderToastContent = (isLoading: boolean) => {
            const ToastContent = () => {
                return (
                    <NudgeContainer className={className}>
                        <NudgeIcon xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                        </NudgeIcon>
                        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '0.2rem' }}>
                            <span>{title}</span>
                            {description && <span style={{ fontSize: '0.75rem', color: '#a1a1aa', marginTop: '0.2rem' }}>{description}</span>}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', gap: '0.4rem', marginLeft: 'auto' }}>
                            {onReset && (
                                <ResetButton
                                    onClick={async () => {
                                        await onReset()
                                        toast.dismiss(toastId.current)
                                    }}
                                    disabled={isLoading}
                                >
                                    Reset
                                </ResetButton>
                            )}
                            <ActionButton
                                onClick={async () => {
                                    await onAction()
                                    toast.dismiss(toastId.current)
                                }}
                                disabled={isLoading}
                            >
                                Save
                            </ActionButton>
                        </div>
                    </NudgeContainer>
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
    }, [show, isLoading, onAction, onReset, description, title, className])
}

export default useAeroNudge