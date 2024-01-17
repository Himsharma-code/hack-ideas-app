"use client";
import AddChallenge from "@/components/ChallengesModal";
import { useMyContext } from "@/context/AppContext";
import { logout } from "@/utils/isLoggedIn";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  User,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function DashBoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, setUser } = useMyContext();
  const router = useRouter();
  return (
    <div>
      <Navbar
        maxWidth="full"
        className="bg-black border-b border-gray-800 w-full"
      >
        <NavbarBrand>
          <p className="font-bold text-inherit">Hack Ideas</p>
        </NavbarBrand>

        <NavbarContent justify="end">
          <AddChallenge />
          <Popover placement="bottom-end">
            <PopoverTrigger>
              <User
                className="cursor-pointer"
                avatarProps={{
                  src: "",
                  name: user?.employeeId?.charAt(0)?.toUpperCase(),
                }}
                name={user?.employeeId}
              />
            </PopoverTrigger>
            <PopoverContent className="bg-slate-900">
              <div className="px-1 py-2">
                <Button
                  onClick={() => {
                    logout();
                    setUser(null);
                    router.push("/");
                  }}
                  color="primary"
                  variant="ghost"
                >
                  Logout
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </NavbarContent>
      </Navbar>
      <div className="p-6">{children}</div>
    </div>
  );
}
