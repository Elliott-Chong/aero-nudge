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
  display: flex;
  align-items: center;
  padding: 0.6rem 0.75rem 0.6rem 1rem;
  margin-left: auto;
  margin-right: auto;
  min-width: 400px;
  max-width: 90vw;
  width: max-content;
  color: white;
  border-radius: 9999px;
  background-image: linear-gradient(to bottom, #374151, #111827);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3),
    0 8px 10px -6px rgba(0, 0, 0, 0.3);
`

const NudgeIcon = styled.svg`
  width: 1.25rem;
  height: 1.25rem;
  margin-right: 0.5rem;
  flex-shrink: 0;
`

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 1rem;
`

const Title = styled.span`
  white-space: nowrap;
`

const Description = styled.span`
  font-size: 0.75rem;
  color: #a1a1aa;
  white-space: nowrap;
`

const ButtonContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-left: auto;
  flex-shrink: 0;
`

const Button = styled.button`
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: white;
  border-radius: 9999px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3),
    0 8px 10px -6px rgba(0, 0, 0, 0.3);
  transition: all 0.2s ease-in-out;

  &:disabled {
    opacity: 0.5;
  }
`

const ResetButton = styled(Button)`
  background-color: #ef4444;
  &:hover:not(:disabled) {
    background-color: #dc2626;
  }
`

const SaveButton = styled(Button)`
  background-color: #22c55e;
  &:hover:not(:disabled) {
    background-color: #16a34a;
  }
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
                        <TextContainer>
                            <Title>{title}</Title>
                            {description && <Description>{description}</Description>}
                        </TextContainer>
                        <ButtonContainer>
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
                            <SaveButton
                                onClick={async () => {
                                    await onAction()
                                    toast.dismiss(toastId.current)
                                }}
                                disabled={isLoading}
                            >
                                Save
                            </SaveButton>
                        </ButtonContainer>
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