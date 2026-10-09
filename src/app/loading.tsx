const Loading = () => {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="text-center">
        <span className="loading loading-spinner loading-lg text-success"></span>

        <p className="mt-4 text-lg font-medium text-gray-600">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
