import { APP_NAME } from "@/constants";
import Link from "next/link";
// import VoteButton from "./VoteButton";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Header = () => {
  return (
    <header className="bg-white p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-gray-800">
          {APP_NAME}
        </Link>
        <div className="flex items-center space-x-4">
        <ConnectButton />
          <Link href="/post" className="text-sm text-gray-800">
            投稿一覧
          </Link>
          <Link href="/privacy-policy" className="text-sm text-gray-800">
            プライバシーポリシー
          </Link>
          <Link href="/terms-of-service" className="text-sm text-gray-800">
            利用規約
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
