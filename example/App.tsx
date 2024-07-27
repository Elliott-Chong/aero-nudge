import React from 'react'
import useAeroNudge from '../src/use-aero-nudge'
import { Toaster } from 'sonner'
import { Prism as SyntaxHighlighter } from 'https://esm.sh/react-syntax-highlighter@15.5.0'
import { vscDarkPlus } from 'https://esm.sh/react-syntax-highlighter@15.5.0/dist/esm/styles/prism'


function App() {

    const [showCode, setShowCode] = React.useState(false)

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br py-20">
            <h1 className="text-2xl font-bold">Aero Nudge Example</h1>
            <p className="text-gray-500">Try changing the name of a user below.</p>
            <div className="h-4"></div>
            <div className="w-full max-w-2xl p-4 bg-white shadow-xl rounded-md border">
                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">Name</th>
                                <th scope="col" className="px-6 py-3">Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            <UserRow name="John Doe" email="john@example.com" />
                            <UserRow name="Jane Smith" email="jane@example.com" />
                            <UserRow name="Bob Johnson" email="bob@example.com" />
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="mt-4 flex items-center gap-4">
                <button
                    onClick={() => setShowCode(!showCode)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                    {showCode ? 'Hide Code' : 'Show Code'}
                </button>
                <a href="https://github.com/elliott-chong/aero-nudge" target="_blank" className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-blue-600 transition-colors flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                    </svg>
                    View on GitHub
                </a>
                <a href="https://youtube.com/@elliottchong" target="_blank" className="px-4 py-2 bg-red-600 text-white rounded hover:bg-blue-600 transition-colors flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                    Watch how I build this
                </a>
            </div>
            {showCode && (
                <SyntaxHighlighter
                    language="javascript"
                    style={vscDarkPlus}
                    customStyle={{
                        padding: '1rem',
                        borderRadius: '0.375rem',
                        fontSize: '0.875rem',
                    }}
                >
                    {`import React from 'react'
import useAeroNudge from 'aero-nudge'
import { Toaster } from 'sonner'

function UserRow({ name: initialName, email }: { name: string, email: string }) {
    const [name, setName] = React.useState(initialName)
    const [isEditing, setIsEditing] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)

    useAeroNudge({
        onAction: async () => {
            setIsLoading(true)
            // Simulate an API call
            await new Promise((resolve) => setTimeout(resolve, 1000))
            setIsLoading(false)
            setIsEditing(false)
        },
        onReset: () => {
            setName(initialName)
            setIsEditing(false)
        },
        isLoading,
        show: name !== initialName,
        description: \`Change \${initialName} to \${name}\`
    })

`}
                </SyntaxHighlighter>
            )}



            <Toaster position="bottom-center" />
        </div>
    )
}

function UserRow({ name: initialName, email }: { name: string, email: string }) {
    const [name, setName] = React.useState(initialName)
    const [isEditing, setIsEditing] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)

    useAeroNudge({
        onAction: async () => {
            setIsLoading(true)
            // Simulate an API call
            await new Promise((resolve) => setTimeout(resolve, 1000))
            setIsLoading(false)
            setIsEditing(false)
        },
        onReset: () => {
            setName(initialName)
            setIsEditing(false)
        },
        isLoading,
        show: name !== initialName,
        description: `Change ${initialName} to ${name}`
    })

    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {isEditing ? (
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border rounded px-2 py-1 w-full"
                    />
                ) : (
                    <div className="flex items-center">
                        <span>{name}</span>
                        <button onClick={() => setIsEditing(true)} className="ml-2 text-gray-500 hover:text-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                            </svg>
                        </button>
                    </div>
                )}
            </th>
            <td className="px-6 py-4">{email}</td>
        </tr>
    )
}
export default App