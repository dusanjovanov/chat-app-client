import React, { memo } from "react";
import categories from "./categories";
import TabSection from "./TabSection";

const TabContent = () => {
  return (
    <>
      {Object.keys(categories).map(k => (
        <TabSection key={k} categoryId={k} />
      ))}
    </>
  );
};

export default memo(TabContent);
