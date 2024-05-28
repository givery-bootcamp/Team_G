import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

const BreadCrumb = ({ breadcrumbItems }: { breadcrumbItems: { name: string; href: string }[] }) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbItems.map((item, i) => {
          return (
            <>
              <BreadcrumbItem key={i}>
                <BreadcrumbLink asChild>
                  <Link href={item.href}>{item.name}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              {i !== breadcrumbItems.length - 1 && <BreadcrumbSeparator />}
            </>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadCrumb;
