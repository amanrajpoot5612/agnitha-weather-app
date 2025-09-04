export default function ErrorMessage({ message }) {
  if (!message) return null;
  return (
    <div className="bg-red-100 text-red-700 border border-red-300 rounded-lg px-4 py-2 mb-4 text-center">
      {message}
    </div>
  );
}
