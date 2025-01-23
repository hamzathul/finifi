import Invoice from "@/app/models/Invoice";
import dbConnect from "@/lib/dbConnect";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

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

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const updateData = await request.json();

  try {
    await dbConnect();
    const updatedInvoice = await Invoice.findByIdAndUpdate(id, updateData, {
      new: true, // Return the updated document
      runValidators: true, // Validate against model schema
    });

    if (!updatedInvoice) {
      return Response.json({ message: "Invoice not found" }, { status: 404 });
    }

    return Response.json(updatedInvoice, { status: 200 });
  } catch (error) {
    return Response.json(
      { message: "Error updating invoice", error: error },
      { status: 500 }
    );
  }
}
