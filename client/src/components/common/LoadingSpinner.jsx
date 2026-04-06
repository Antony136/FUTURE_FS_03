const LoadingSpinner = ({ size = 'md', text = '' }) => {
  const sizes = { sm: 20, md: 36, lg: 56 };
  const px = sizes[size] || 36;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        padding: '3rem',
      }}
    >
      <div
        style={{
          width: px,
          height: px,
          borderRadius: '50%',
          border: `${size === 'sm' ? 2 : 3}px solid var(--color-border)`,
          borderTopColor: 'var(--color-gold-400)',
          animation: 'spin 0.7s linear infinite',
        }}
      />
      {text && (
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', fontFamily: 'var(--font-body)' }}>
          {text}
        </p>
      )}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default LoadingSpinner;
