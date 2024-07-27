import React from 'react'
import useAeroNudge from '../src/use-aero-nudge'
import { Toaster } from 'sonner'

function App() {
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
    return (
        <div>
            <h1>Test Environment</h1>
            <Toaster />
        </div>
    )
}

export default App