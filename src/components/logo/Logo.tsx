import Image from 'next/image';

export default function Logo() {
  return (
    <>
      <Image
        className="min-w-[220px] h-[35px]"
        width={220}
        height={35}
        src="/img/logo.png"
        alt="logo"
      />
    </>
  );
}
