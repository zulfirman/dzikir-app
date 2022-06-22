import {Link} from "@remix-run/react";

export default function Whoa() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1 className={'mb-5'}>Whoa Page</h1>
      <ul>
        <li>
          <Link
              to="/about"
          >back to about</Link>
        </li>
      </ul>
    </div>
  );
}
