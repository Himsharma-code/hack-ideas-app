import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  User,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";

export default function DashBoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar
        maxWidth="full"
        className="bg-black border-b border-gray-800 w-full"
      >
        <NavbarBrand>
          {/* <AcmeLogo /> */}
          <p className="font-bold text-inherit">Hack Ideas</p>
        </NavbarBrand>

        <NavbarContent justify="end">
          <Popover placement="bottom-end">
            <PopoverTrigger>
              <User name="Jane Doe" />
            </PopoverTrigger>
            <PopoverContent className="bg-slate-900">
              <div className="px-1 py-2">
                <div className="text-small font-bold">Popover Content</div>
                <div className="text-tiny">This is the popover content</div>
              </div>
            </PopoverContent>
          </Popover>
        </NavbarContent>
      </Navbar>
      <div className="p-6">{children}</div>
    </div>
  );
}
