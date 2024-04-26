import React from "react";
import { Skeleton } from "primereact/skeleton";

export default function SkeletonCurrencySwap() {
  return (
    <div className="p-2 h-11rem w-30rem fadeout animation-duration-500">
      <Skeleton height="2rem" className="mb-2"></Skeleton>
      <div className="flex justify-content-between">
        <Skeleton height="2rem" width="49%" className="mb-2"></Skeleton>
        <Skeleton height="2rem" width="49%" className="mb-2"></Skeleton>
      </div>
      <div className="flex justify-content-between">
        <Skeleton height="2rem" width="25%" className="mb-2"></Skeleton>
        <Skeleton height="2rem" width="71%" className="mb-2"></Skeleton>
      </div>
    </div>
  );
}
