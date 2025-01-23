import Invoice from "@/app/models/Invoice";
import dbConnect from "@/lib/dbConnect";

export async function GET() {
  try {
    await dbConnect();
    const invoices = await Invoice.find();
    return Response.json(invoices, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json(error, { status: 500 });
  }
}

export async function POST(request: Request) {
  const {
    vendorName,
    invoiceNumber,
    status,
    netAmount,
    invoiceDate,
    dueDate,
    department,
    costCenter,
    poNumber,
  } = await request.json();

  try {
    await dbConnect();
    const newInvoice = new Invoice({
      vendorName,
      invoiceNumber,
      status,
      netAmount,
      invoiceDate,
      dueDate,
      department,
      costCenter,
      poNumber,
    });
    const savedInvoice = await newInvoice.save();
    return Response.json(savedInvoice, { status: 201 });
  } catch (error) {
    console.log(error);
    return Response.json(error, { status: 500 });
  }
}

