// localhost:3000/ 对应 app/page.js 里的 default export component
// localhost:3000/foo 对应 app/foo/page.js 里的 default export component

import Navigation from "../components/Navigation";

// localhost:3000/foo/bar 对应 app/foo/bar/page.js 里的 default export component
export default function Page() {
  return (
    <>
      <Navigation />
      <h2>cabin page!</h2>
    </>
  );
}
