export default function NotFound() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: '25%',
        left: ' 25%',
        right: '25%',
        bottom: '50%',
        textAlign: 'center',
      }}
    >
      <h3 style={{ color: 'white', fontSize: '84px' }}>404 page not found</h3>
      <p style={{ color: 'white' }}>
        We are sorry but the page you are looking for does not exist.
      </p>
    </div>
  );
}
