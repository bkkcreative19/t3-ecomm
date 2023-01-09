import type { NextPage } from "next";
import { useSession, signOut } from "next-auth/react";
import styled from "styled-components";
import { Layout } from "../../features/ui/layout";
import { trpc } from "../../utils/trpc";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const ProfileStyles = styled.div``;

const ProfilePage: NextPage = () => {
  const { data: orders } = trpc.order.getOrders.useQuery();
  console.log(orders);
  const { data: session } = useSession();
  return (
    <ProfileStyles>
      <Layout>
        {" "}
        <h1>My Orders</h1>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">Date</TableCell>
                <TableCell align="right">Total</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders?.map((order: any) => (
                // <TableRow
                //   key={row.name}
                //   sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                // >
                //   <TableCell component="th" scope="row">
                //     {row.name}
                //   </TableCell>
                //   <TableCell align="right">{row.calories}</TableCell>
                //   <TableCell align="right">{row.carbs}</TableCell>
                //   <TableCell align="right">
                //     <button>Details</button>
                //   </TableCell>
                // </TableRow>
                <></>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Layout>
    </ProfileStyles>
  );
};

export default ProfilePage;
