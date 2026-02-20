import { NextResponse } from "next/server";
import { extractCredentials, cancelOpenOrder } from "@/lib/etoro";
import type { DeleteTradingDemoCancelOpenOrderResponse, EtoroApiErrorResponse } from "./types";

export async function DELETE(request: Request): Promise<NextResponse<DeleteTradingDemoCancelOpenOrderResponse | EtoroApiErrorResponse>> {
  try {
    const credentials = extractCredentials(request);
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get("orderId");
    if (!orderId) {
      return NextResponse.json({ error: "orderId is required." }, { status: 400 });
    }
    const result = await cancelOpenOrder(credentials, orderId, true);
    return NextResponse.json(result as DeleteTradingDemoCancelOpenOrderResponse);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Request failed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
