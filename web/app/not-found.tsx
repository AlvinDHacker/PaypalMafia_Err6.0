import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center space-y-6 p-8 max-w-lg">
        <div className="flex justify-center">
          <AlertCircle className="h-20 w-20 text-[#56b76c]" />
        </div>

        <h1 className="text-4xl font-bold text-gray-900">Page Not Found</h1>

        <p className="text-gray-600 text-lg">
          Oops! The page you&apos;re looking for doesn&apos;t exist or has been
          moved.
        </p>

        <a
          href="/"
          className="inline-block px-6 py-3 bg-[#56b76c] text-white rounded-lg hover:bg-[#2d8642] transition-colors"
        >
          Return Home
        </a>
      </div>
    </div>
  );
}
