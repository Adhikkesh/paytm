import { Link } from "react-router-dom";

export default function BottomWarning({ content, type, to }) {
  return (
    <div>
      <p className="text-sm font-light text-gray-900">
        {content}?{" "}
        <Link
          to={to}
          className="text-sm text-blue-600 hover:underline font-medium"
        >
          {type}
        </Link>
      </p>
    </div>
  );
}
