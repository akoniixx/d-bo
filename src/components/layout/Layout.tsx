import React from "react";

import { NavSidebar } from "./NavSideBar";
import { color } from "../../resource";

export const DashboardLayout = ({ children }: any) => {
  return (
  <div className="flex h-screen bg-gray-200">
      <NavSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <main className="content">
          <section className="sm:flex-row flex flex-col flex-1">
            <div
              style={{
                height: "100%",
                marginLeft: 240,
                padding: 30,
                backgroundColor: color.BG,
                paddingTop: 95,
              }}
            >
              {children}
            </div>
          </section>
        </main>
      </div>
    </div>  
  );
};
