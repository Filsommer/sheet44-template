import { NextResponse } from "next/server";
import { extractCredentials, cancelCloseOrder } from "@/lib/etoro";
import type { DeleteTradingDemoCancelCloseOrderResponse, EtoroApiErrorResponse } from "./types";

export async function DELETE(request: Request): Promise<NextResponse<DeleteTradingDemoCancelCloseOrderResponse | EtoroApiErrorResponse>> {
  try {
    const credentials = extractCredentials(request);
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get("orderId");
    if (!orderId) {
      return NextResponse.json({ error: "orderId is required." }, { status: 400 });
    }
    const result = await cancelCloseOrder(credentials, orderId, true);
    return NextResponse.json(result as DeleteTradingDemoCancelCloseOrderResponse);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Request failed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
