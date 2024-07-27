https://github.com/user-attachments/assets/e08b7922-b931-445c-b1f3-f826cb2215c7


<img width="1149" alt="image" src="https://github.com/user-attachments/assets/ad2cac38-f07a-46cc-91ed-fd7e47ec1d6d">



# aero-nudge

Clerk inspired floating toast button for confirmation of actions, powered by Sonner.

## Installation

```bash
npm install aero-nudge
# or
yarn add aero-nudge
# or
pnpm add aero-nudge
```

## Pre-requisites

Please make sure to install sonner and import the Toaster component into your root layout first! More instructions [here](https://github.com/emilkowalski/sonner)

```typescript
import { Toaster, toast } from 'sonner';

// ...

function App() {
  return (
    <div>
      <Toaster />
      <button onClick={() => toast('My first toast')}>Give me a toast</button>
    </div>
  );
}
```


## Usage

```typescript
import useActionToast from 'aero-nudge';

const MyComponent = () => {
  const handleAction = async () => {
    // Your action logic here
  };

  const handleReset = () => {
    // Your reset logic here
  };

  useActionToast({
    onAction: handleAction,
    onReset: handleReset,
    isLoading: false,
    show: true,
    description: 'Optional description'
  });

  return (
    // Your component JSX
  );
};
```

## API

### `useActionToast` Hook

This hook creates a floating toast button for confirming actions.

#### Props

- `onAction`: `() => Promise<void>` - Function to call when the "Save" button is clicked.
- `onReset`: `() => void` - (Optional) Function to call when the "Reset" button is clicked.
- `isLoading`: `boolean` - Whether the action is in progress.
- `show`: `boolean` - Whether to show the toast.
- `description`: `string` - (Optional) Additional description to show in the toast.

## Features

- Clerk-inspired design
- Powered by Sonner for toast notifications
- Customizable action and reset buttons
- Loading state support
- Optional description text

## Dependencies

- React
- sonner

## License

MIT

## Author

Elliott Chong
