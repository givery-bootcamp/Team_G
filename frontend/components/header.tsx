import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-primary p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-white">
          App Name
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/post" className="text-sm text-white">
            post
          </Link>
          <Link href="/privacy-policy" className="text-sm text-white">
            privacy policy
          </Link>
          <Link href="/terms-of-service" className="text-sm text-white">
            terms of service
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
