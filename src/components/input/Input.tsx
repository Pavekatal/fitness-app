interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  error?: boolean;
}

export default function Input({ className = '', error, ...props }: InputProps) {
  return (
    <>
      <input
        className={` px-4.5 py-4 border border-[#D0CECE] rounded-lg text-[14px] md:text-lg leading-4 md:leading-[21px] placeholder-gray-400 placeholder-font-normal ${className} placeholder-text-[14px] md:placeholder-text-[18px] outline-none ${error ? 'border-[rgba(219,0,48,1)]' : ''} `}
        {...props}
      />
    </>
  );
}
