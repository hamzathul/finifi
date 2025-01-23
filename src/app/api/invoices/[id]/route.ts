import Invoice from "@/app/models/Invoice";
import dbConnect from "@/lib/dbConnect";

export async function DELETE(
  request: Request,
  context: { params: { id: string } }
) {
  const { id } = await context.params;

  try {
    await dbConnect();
    const deletedInvoice = await Invoice.findByIdAndDelete(id);

    if (!deletedInvoice) {
      return Response.json({ message: "Invoice not found" }, { status: 404 });
    }

    return Response.json(deletedInvoice, { status: 200 });
  } catch (error) {
    return Response.json(
      { message: "Error deleting invoice" },
      { status: 500 }
    );
  }
}
