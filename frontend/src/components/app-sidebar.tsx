import * as React from "react";
import { User, Building } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

type AppSidebarProps = {
  activeTab: string;
  onChangeTab: (tab: string) => void;
};

export function AppSidebar({ activeTab, onChangeTab, ...props }: AppSidebarProps & React.ComponentProps<typeof Sidebar>) {
  const menuItems = [
    { key: "clientes",
      title: "Clientes",
      icon: User,
      items: [
        { key: "reservar-acomodacao", title: "Reservar Acomodação", url: "#" },
      ],
    },
    { 
      key: "empresas",
      title: "Empresas",
      icon: Building,
      items: [
        { key: "listar-acomodacao", title: "Listar Acomodação", url: "#" },
      ],
    },
  ];

  return (
    <Sidebar {...props} className="w-64 flex-shrink-0">
      <SidebarHeader>
        <SidebarMenu>
          {menuItems.map(({ key, title, icon: Icon, items }) => (
            <SidebarMenuItem key={key}>
              <SidebarMenuButton asChild>
                <a href="#" onClick={(e) => { e.preventDefault(); onChangeTab(key); }} className={`flex items-center gap-2 ${activeTab === key ? "font-bold bg-muted" : ""}`}>
                  <Icon className="w-5 h-5" />
                  {title}
                </a>
              </SidebarMenuButton>

              {/* Submenu só para "empresas" */}
              {key === "empresas" && items && items.length > 0 && (
                <SidebarMenuSub>
                  {items.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.key}>
                      <SidebarMenuSubButton asChild>
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            onChangeTab(subItem.key);
                          }}
                          className={activeTab === subItem.key ? "font-bold bg-muted" : ""}
                        >
                          {subItem.title}
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              )}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarHeader>

      {/* Conteúdo do sidebar */}
      <SidebarContent>
        <SidebarGroup>
          {/* Aqui você pode repetir a estrutura ou remover duplicados se preferir */}
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
