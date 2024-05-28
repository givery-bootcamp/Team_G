import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const BreadCrumb = ({ breadcrumbItems }: { breadcrumbItems: { name: string; href: string }[] }) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbItems.map((item, i) => {
          return (
            <>
              <BreadcrumbItem>
                <BreadcrumbLink href={item.href}>{item.name}</BreadcrumbLink>
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
