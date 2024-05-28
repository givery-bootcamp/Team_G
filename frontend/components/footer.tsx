import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-white p-4">
      <div className="flex items-center justify-center">
        <Link href="/" className="text-xl font-bold text-gray-800">
          App Name
        </Link>
      </div>
      <nav>
        <ul className="flex items-center justify-center">
          <li className="p-2">
            <Link href="/" className="text-gray-800">
              Home
            </Link>
          </li>
          <li className="p-2">
            <Link href="/privacy-policy" className="text-gray-800">
              プライバシーポリシー
            </Link>
          </li>
          <li className="p-2">
            <Link href="/terms-of-service" className="text-gray-800">
              利用規約
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
