import Link from "next/link";
import React from "react";

const MenuLink = ({ item }) => {
  return <Link href={item.path}>{item.title}</Link>;
};

export default MenuLink;
