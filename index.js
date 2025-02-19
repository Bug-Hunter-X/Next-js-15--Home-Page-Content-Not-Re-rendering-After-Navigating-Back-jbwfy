```javascript
// pages/index.js
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [count, setCount] = useState(0);

  useEffect(() => {
    //Adding this useEffect will solve the issue.
    const handleRouteChange = (url, { shallow }) => {
        setCount(c=>c+1);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <div>
      <h1>Welcome to my Next.js app!</h1>
      <p>Count: {count}</p>
      <Link href='/about'>
        <a>Go to About Page</a>
      </Link>
    </div>
  );
}
```
```javascript
//pages/about.js

export default function About(){
    return(
        <h1>About page</h1>
    );
}
```