import React from "react";

type Props = {
  children: React.ReactNode;
};

export default async function Layout(props: Props) {
  return (
    <div className="flex items-center justify-center bg-background">
      {props.children}
    </div>
  );
}
