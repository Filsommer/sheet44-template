import { NextResponse } from "next/server";
import { extractCredentials, deleteLimitOrder } from "@/lib/etoro";
import type { DeleteTradingDemoDeleteLimitOrderResponse, EtoroApiErrorResponse } from "./types";

export async function DELETE(request: Request): Promise<NextResponse<DeleteTradingDemoDeleteLimitOrderResponse | EtoroApiErrorResponse>> {
  try {
    const credentials = extractCredentials(request);
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get("orderId");
    if (!orderId) {
      return NextResponse.json({ error: "orderId is required." }, { status: 400 });
    }
    const result = await deleteLimitOrder(credentials, orderId, true);
    return NextResponse.json(result as DeleteTradingDemoDeleteLimitOrderResponse);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Request failed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
