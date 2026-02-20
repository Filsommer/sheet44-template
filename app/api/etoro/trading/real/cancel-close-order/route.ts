import { NextResponse } from "next/server";
import { extractCredentials, cancelCloseOrder } from "@/lib/etoro";
import type { DeleteTradingRealCancelCloseOrderResponse, EtoroApiErrorResponse } from "./types";

export async function DELETE(request: Request): Promise<NextResponse<DeleteTradingRealCancelCloseOrderResponse | EtoroApiErrorResponse>> {
  try {
    const credentials = extractCredentials(request);
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get("orderId");
    if (!orderId) {
      return NextResponse.json({ error: "orderId is required." }, { status: 400 });
    }
    const result = await cancelCloseOrder(credentials, orderId, false);
    return NextResponse.json(result as DeleteTradingRealCancelCloseOrderResponse);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Request failed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
