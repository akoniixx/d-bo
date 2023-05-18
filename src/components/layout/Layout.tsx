import React from "react";

import { NavSidebar } from "./NavSideBar";
import BodyWrapper from "./BodyWrapper";
import { color } from "../../resource";

export const DashboardLayout = ({ children }: any) => {
  return (
    <BodyWrapper>
      <div className="flex h-screen bg-gray-200">
        <NavSidebar />

        <div className="flex flex-col flex-1 overflow-hidden">
          <main className="content">
            <section className="sm:flex-row flex flex-col flex-1">
              <div
                style={{
                  height: 'auto',
                  marginLeft: 240,
                  padding: 30,
                  backgroundColor: color.BG,
                  paddingTop: 90
                }}
              >
                {children}
              </div>
            </section>
          </main>
        </div>
      </div>
    </BodyWrapper>
  );
};
