import React from 'react'
import useAeroNudge from '../src/use-aero-nudge'
import { Toaster } from 'sonner'

function App() {
    const [inputValue, setInputValue] = React.useState('')

    useAeroNudge({
        onAction: async () => {
            console.log('action')
        },
        onReset: () => {
            console.log('reset')
        },
        isLoading: false,
        show: true,
        description: 'Calendly URL'
    })
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Submitted:', inputValue)
        // Add your submit logic here
    }
    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f3f4f6'
        }}>
            <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '2rem' }}>Test Environment</h1>
            <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '28rem' }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    borderBottom: '2px solid #3b82f6',
                    padding: '0.5rem 0'
                }}>
                    <input
                        style={{
                            flex: 1,
                            background: 'transparent',
                            border: 'none',
                            color: '#374151',
                            marginRight: '0.75rem',
                            padding: '0.25rem 0.5rem',
                            outline: 'none'
                        }}
                        type="text"
                        placeholder="Enter your text here"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <button
                        style={{
                            backgroundColor: '#3b82f6',
                            color: 'white',
                            border: 'none',
                            padding: '0.5rem 1rem',
                            borderRadius: '0.25rem',
                            fontSize: '0.875rem',
                            cursor: 'pointer'
                        }}
                        type="submit"
                    >
                        Submit
                    </button>
                </div>
            </form>
            <Toaster />
        </div>
    )
}

export default App