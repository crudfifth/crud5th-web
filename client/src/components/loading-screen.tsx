export default function LoadingScreen() {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-background flex items-center justify-center z-[9999]" data-testid="loading-screen">
      <div className="text-center">
        <div className="loading-spinner mb-4 mx-auto"></div>
        <div className="text-primary font-semibold text-xl">CRUD5th</div>
      </div>
    </div>
  );
}
