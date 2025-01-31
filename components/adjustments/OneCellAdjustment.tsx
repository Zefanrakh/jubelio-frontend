import { ReadAdjustmentDto } from "@/types/adjustment/ReadAdjustmentDto";
import AdjustmentAction from "./AdjustmentAction";

export default function OneCellAdjustment({
  adjustment,
}: {
  adjustment: ReadAdjustmentDto;
}) {
  /* ----------------------------- RENDER -------------------------------- */

  return (
    <div className="flex flex-col justify-between h-full gap-3">
      {/* Content */}
      <div className="flex flex-col gap-1">
        <div className="flex">
          <div className="flex-1 font-bold">SKU</div>
          <div className="flex-[2]">{adjustment.sku}</div>
        </div>
        <div className="flex">
          <div className="flex-1 font-bold">Quantity</div>
          <div className="flex-[2]">{adjustment.qty}</div>
        </div>
        <div className="flex">
          <div className="flex-1 font-bold">Total</div>
          <div className="flex-[2]">${adjustment.amount.toFixed(2)}</div>
        </div>
      </div>
      {/* Action */}
      <AdjustmentAction adjustment={adjustment} />
    </div>
  );
}
