import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <main className="container flex flex-col items-center justify-center h-screen gap-10">
      <hgroup className="text-center">
        <h1>404</h1>
        <h3>Page you are looking for does not exist</h3>
      </hgroup>
      <Link to="/" className="primary-button">
        Take me back
      </Link>
    </main>
  );
}
