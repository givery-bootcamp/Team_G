import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const breadcrumbItems = [
  { name: "Home", href: "/" },
  { name: "投稿一覧", href: "/post" },
  { name: "Post 1", href: "/post/1" },
];

const BreadCrumb = () => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbItems.map((item) => {
          return (
            <>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">{item.name}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadCrumb;
