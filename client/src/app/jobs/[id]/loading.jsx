export default function Loading() {
  return (
    <div className="min-h-screen bg-[#F8F8FD]">
      <div className="bg-white shadow-sm h-16" />
      <div className="container mx-auto px-4 py-12">
        <div className="animate-pulse space-y-4 max-w-3xl">
          <div className="h-6 bg-gray-200 rounded w-32" />
          <div className="h-10 bg-gray-200 rounded w-2/3" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
          <div className="h-64 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
}
