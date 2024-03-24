> A doc about some design decisions I made

# Table of Contents

- [Time zone](#linkedlist)
- [how to design db schema](#useEffect)
- [when to store user in db](#useEffect)
- [db auth rules](#useEffect)
- [solve routes problem, refresh](#useEffect)
- [all the fields in usercard table](#field)
- [using context api to share the state across different components](#context-api)
- [CardType](#card-type)


# time zone

> all function's input argument is utcDateString format

- we first convert it to utc
- we don't use setHour anymore
- all function's input is a utcDateString


# db schema

- many-to-many relationship


# auth db integration

- put user in db after first time log in

# db authorization rules

# solve routes problem

# fields


# context api


Using Context API
Create a Context: Define a context to share the state across different components. This context will keep track of when a new memory is added.

```javascript
// MemoryContext.js
import React, { createContext, useState, useContext } from 'react';

const MemoryContext = createContext();

export const useMemory = () => useContext(MemoryContext);

export const MemoryProvider = ({ children }) => {
  const [memoryAdded, setMemoryAdded] = useState(false);

  const triggerMemoryAdded = () => {
    setMemoryAdded(true);
    // Optionally, reset after a short delay
    setTimeout(() => setMemoryAdded(false), 100);
  };

  return (
    <MemoryContext.Provider value={{ memoryAdded, triggerMemoryAdded }}>
      {children}
    </MemoryContext.Provider>
  );
};

```

2. Wrap Your Application with the Context Provider:
```Javascript
// In your main App.js or where you define your routes
import { MemoryProvider } from './MemoryContext';

function App() {
  return (
    <MemoryProvider>
      {/* your existing layout */}
    </MemoryProvider>
  );
}

```
3. Use the Context in AddMemory Component: When a new memory is added, call the triggerMemoryAdded function.


```js
// In AddMemory component
import { useMemory } from './MemoryContext';

const AddMemory = () => {
  const { triggerMemoryAdded } = useMemory();

  const handleAddMemory = async () => {
    // your logic to add a memory
    triggerMemoryAdded();
  };

  // your component code
};

```

4. Reacting to the Context Change in Each Screen:

In each screen component, use the useMemory hook to react to changes. For example, you can refetch data or update the state when memoryAdded changes.

```js
// In each screen component like HomeScreen, CatchUpScreen, etc.
import { useEffect } from 'react';
import { useMemory } from './MemoryContext';

const HomeScreen = () => {
  const { memoryAdded } = useMemory();

  useEffect(() => {
    if (memoryAdded) {
      // Refetch data or update state
    }
  }, [memoryAdded]);

  // rest of your component
};

```
> This approach allows any screen to react to the addition of a new memory, ensuring that the current screen is updated or refreshed accordingly. The use of a context provides a clean and efficient way to manage and propagate state changes across different components in your application.




# Card Type

- daily card
- general card
- one-time card
- Periodic card

