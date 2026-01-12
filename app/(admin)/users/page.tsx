import { Container } from "@components/shared";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@components/ui/table";
import { getAllUsers } from "app/actions";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export default async function UserPage() {
 const data = await getAllUsers()
 
  return (
    <Container className="py-5">
      <DataTable columns={columns} data={data} />
    </Container>
  );
}
