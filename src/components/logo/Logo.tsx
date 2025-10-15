import Image from 'next/image';

export default function Logo() {
  return (
    <>
      <Image
        className="w-auto"
        width={220}
        height={35}
        src="/img/logo.png"
        alt="logo"
      />
    </>
  );
}
