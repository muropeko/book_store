import { Container } from "@components/shared";
import { getAllOrders } from "app/actions/orders";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default async function OrdersPage() {
    const data = await getAllOrders()
 
  return (
    <Container className="py-5">
        <DataTable columns={columns} data={data} />
    </Container>
  );
}
