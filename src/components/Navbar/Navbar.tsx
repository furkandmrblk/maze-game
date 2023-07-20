import Link from 'next/link';
import localFont from 'next/font/local';

const clashDisplay = localFont({
  src: '../../../public/fonts/ClashDisplay-Variable.ttf',
  variable: '--font-clash-display',
  preload: true,
});

export const Navbar = () => {
  return (
    <nav
      className={`${clashDisplay.className} relative z-10 flex items-center justify-between w-full mb-10 md:mb-20`}
    >
      <Link
        href="https://furkandmrblk.com/"
        className="text-black font-medium no-underline"
      >
        furkan demirbilek
      </Link>
    </nav>
  );
};
