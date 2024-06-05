// eslint-disable-next-line react/prop-types
export default function PopupContainer({ children }) {
  return (
    <div className="fixed w-full h-screen top-0 left-0 bg-black/70 z-50 center">
      {children}
    </div>
  );
}
