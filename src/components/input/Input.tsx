interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export default function Input({ className = '', ...props }: InputProps) {
  return (
    <>
      <input
        className={` px-4.5 py-4 border border-[#D0CECE] rounded-[8px] text-lg placeholder-gray-400 placeholder-font-normal ${className} placeholder-text-[18px] outline-none `}
        {...props}
      />
    </>
  );
}
