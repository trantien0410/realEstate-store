import Link from "next/link";

import getBillboards from "@/actions/get-billboards";
import Container from "./ui/container";
import MainNav from "./main-nav";
import Logo from "./logo";
import Search from "./search";

export const revalidate = 0;

const Navbar = async () => {
  const billboards = await getBillboards();

  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="border-b-[1px]">
        <Container>
          <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center">
            <Link href="/" className="ml-4 flex lg:ml-0 gap-x-2">
              {/* <p className="font-bold text-xl">STORE</p> */}
              <Logo />
            </Link>
            <MainNav data={billboards} />
            <div className="ml-auto flex items-center space-x-4">
              <Search />
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
