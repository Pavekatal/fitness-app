import { ReactNode } from 'react';
import Header from '@/components/header/Header';

export default function FitnessLayout(props: { children: ReactNode }) {
  return (
    <div className="ml-[140px] mr-[140px] ">
      <header id="start">
        <Header />
      </header>
      <main className="mt-[60px]">{props.children}</main>
    </div>
  );
}
