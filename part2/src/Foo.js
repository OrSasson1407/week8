import { useState } from 'react';

function Foo() {
  // שינוי מהמצגת: מתחילים מ-0
  const [count, setCount] = useState(0);

  return (
    <div style={{ border: '1px solid black', margin: '20px', padding: '10px' }}>
        {/* שינוי: הוספת כותרת */}
        <h2>Counter form Slide 149</h2>
        <p>You clicked {count} times</p>
        {/* שינוי: הוספת כפתור שמעלה את המספר */}
        <button onClick={() => setCount(count + 1)}>
          Click me
        </button>
    </div>
  );
}

export default Foo;