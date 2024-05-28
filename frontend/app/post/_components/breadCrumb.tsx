"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { usePathname } from "next/navigation";

const BreadCrumb = () => {
  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "投稿一覧", href: "/post" },
    { name: "Post 1", href: "/post/1" },
  ];
  const pathname = usePathname();
  const pathtoString = pathname.toString();
  const parts = pathtoString.split("/");
  let isDetailView = false;
  if (parts[parts.length - 1] == "post") {
    isDetailView = true;
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbItems.map((item, i) => {
          if (isDetailView) {
            if (i !== breadcrumbItems.length - 2) {
              return (
                <>
                  <BreadcrumbItem>
                    <BreadcrumbLink href={item.href}>{item.name}</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                </>
              );
            } else {
              return (
                <>
                  <BreadcrumbItem>
                    <BreadcrumbPage>{item.name}</BreadcrumbPage>
                  </BreadcrumbItem>
                </>
              );
            }
          } else {
            if (i !== breadcrumbItems.length - 1) {
              return (
                <>
                  <BreadcrumbItem>
                    <BreadcrumbLink href={item.href}>{item.name}</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                </>
              );
            } else {
              return (
                <>
                  <BreadcrumbItem>
                    <BreadcrumbPage>{item.name}</BreadcrumbPage>
                  </BreadcrumbItem>
                </>
              );
            }
          }
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadCrumb;
