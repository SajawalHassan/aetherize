import React from "react";

interface Props {
  children: React.ReactNode;
}

const Layout = (props: Props) => {
  return <div className="h-screen w-screen flex items-center justify-center">{props.children}</div>;
};

export default Layout;
