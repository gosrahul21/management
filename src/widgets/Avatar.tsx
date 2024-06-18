

const Avatar = ({ src, alt, size }: any) => {
  return (
    <div className={`rounded-full overflow-hidden`} style={{ width: size, height: size }}>
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    </div>
  );
};

export default Avatar;
