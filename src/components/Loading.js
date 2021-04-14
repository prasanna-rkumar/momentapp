export default function Loading({ message }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: "60vh"
    }}>
      <h3 className="text-4xl text-white font-extrabold">{message ?? 'Loading...'}</h3>
    </div>
  );
}